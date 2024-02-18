import React, { useState } from "react";

import { Account } from "./Auth/Account";
import Status from "./Auth/Status";

export default function App() {
  return (
    <Account>
      <Status />
    </Account>
  );
}

