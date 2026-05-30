# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeDo is a React Native (Expo) mobile app for iOS and Android that lets users create, discover, and join local events/activities. The backend is fully serverless on AWS (Cognito auth, API Gateway + Lambda, DynamoDB, S3).

## Commands

```bash
# Install dependencies
npm install

# Start Expo dev server (prompts for iOS/Android/Web)
npm start

# Target a specific platform directly
npm run android
npm run ios
npm run web
```

There is no test runner, no linting config, and no TypeScript — the project is plain JavaScript.

## Architecture

### Entry Point & Auth Gate

`App.js` → `<Account>` (Context provider) → `<Status>` (auth router)

`Auth/Status.js` calls `getSession()` on mount. If a valid Cognito session exists it renders `AppNavigator`; otherwise `AuthNavigator`. The `status` boolean in `AccountContext` drives this switch — set `setStatus(true/false)` to transition between authenticated and unauthenticated states.

### Authentication (`Auth/`)

| File | Purpose |
|------|---------|
| `Account.js` | `AccountContext` — exposes `authenticate`, `getSession`, `logout`, `registerUser`, `verifyAttribute`, `status`, `setStatus` |
| `Status.js` | Auth gate / NavigationContainer root |
| `UserPool.js` | AWS Cognito User Pool + App Client configuration |
| `authStorage.js` | Secure token/userId/userInfo storage via `expo-secure-store` |
| `asyncStorage.js` | Event caching via `@react-native-async-storage` |
| `UploadFile.js` | S3 image upload utility |

On successful login, `authenticate()` stores the JWT (`x-auth-token`) and Cognito `sub` (userId) via `authStorage`. The API client automatically injects the token via a request transform.

### API Layer (`api/`)

- `client.js` — `apisauce` instance pointed at AWS API Gateway (`ap-southeast-2`). An async request transform reads the token from `authStorage` and sets `x-auth-token` on every request.
- `events.js` — event CRUD: add, get, search, filter by tag/date, join/leave
- `users.js` — user profile: add, update, retrieve
- `auth.js` — auth-related endpoints

All API calls are consumed via the `useApi` hook (see below).

### `useApi` Hook (`hooks/useApi.js`)

Wraps any API function and returns `{ data, request, error, loading }`. Screens call `useApi(apiModule.someFunction)` then invoke `request(...args)` to trigger the call. This is the standard pattern for all data fetching in this codebase.

```js
const getEvents = useApi(eventsApi.getEvents);
// later:
await getEvents.request();
// access: getEvents.data, getEvents.loading, getEvents.error
```

### Navigation (`navigation/`)

```
NavigationContainer (Status.js)
├── AuthNavigator        (Stack: Welcome → Login → Registration)
│   └── RegistrationNavigator  (Stack: UserInfo → EmailPassword → Confirmation → TwoFactor → FirstTimeSetup)
└── AppNavigator         (BottomTab: feed | search | create | calendar | profile)
    ├── FeedNavigator    (Stack: Home → EventDetails)
    └── ProfileNavigation (Stack: Profile → EditProfile → Settings → EventDetails)
```

The Create tab uses a custom `CreateEventButton` component instead of a standard tab button.

### Forms (`components/forms/`)

All forms use **Formik + Yup**. The pattern:
1. Wrap with `<AppForm initialValues={...} validationSchema={...} onSubmit={...}>`
2. Use `<AppFormField>`, `<AppFormPicker>`, `<FormImagePicker>` inside — they connect to Formik context automatically via `useFormikContext()`
3. `<SubmitButton>` and `<BackButton>` for actions
4. `<ErrorMessage>` for field-level errors

### Config (`config/`)

- `colours.js` — single source of truth for the color palette. Always reference colours from here rather than hardcoding hex values.
- `defaultStyles.js` — global text styles and platform-specific font families (iOS vs Android)

### AWS Infrastructure

| Service | Usage |
|---------|-------|
| Cognito | User Pool auth, registration, email verification, 2FA |
| API Gateway | REST API base URL (hardcoded in `api/client.js`) |
| Lambda | Backend handlers (external repo) |
| DynamoDB | Data store (external repo) |
| S3 | Profile picture and event image storage via `UploadFile.js` |

Region: `ap-southeast-2` (Sydney). The Cognito Client ID is hardcoded in `Auth/Account.js` (`verifyAttribute`) and `Auth/UserPool.js`.
