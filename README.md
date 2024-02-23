# Event Manager Canister

The Event Manager Canister is a backend system designed to manage events, users, and tickets within an application. It provides a set of functions for adding, retrieving, updating, and deleting events and users, as well as creating and managing tickets associated with events.

## Features

- **Event Management**: Add, retrieve, update, and delete events with properties such as title, description, date, location, and attachment URL.
- **User Management**: Add, retrieve, update, and delete users with properties such as name, email, phone, and address.
- **Ticket Management**: Create, retrieve, and manage tickets for events, including associating tickets with users.

## Usage

### Installation

To use the Event Manager Canister in your project, you can install it via npm:

```bash
npm install azle
```

### Importing

You can import the necessary functions and data structures from the "azle" library:

```javascript
import { query, update, text, Record, StableBTreeMap, Variant, Vec, Ok, Err, ic, Principal, nat64, Result, Canister } from "azle";
```

### Data Structures

The Event Manager Canister defines the following data structures:

- **Event**: Represents an event with properties such as id, title, description, date, startTime, attachmentURL, location, seller, maxSlots, and reservedAmount.
- **User**: Represents a user with properties id, name, email, phone, address, and tickets.
- **Ticket**: Represents a ticket with properties id, eventId, and userId.

### Functions

#### Event Management

- **addEvent**: Add a new event to the system.
- **getEvents**: Retrieve all events stored in the system.
- **getEvent**: Retrieve a specific event by its ID.
- **updateEvent**: Update an existing event with new information.

#### User Management

- **addUser**: Add a new user to the system.
- **getUsers**: Retrieve all users stored in the system.
- **getUser**: Retrieve a specific user by their ID.
- **getUserEvents**: Retrieve events reserved by a specific user.
- **updateUser**: Update an existing user with new information.

#### Ticket Management

- **createTicket**: Create a new ticket for an event and associate it with a user.
- **getTickets**: Retrieve all tickets stored in the system.
- **getEventTickets**: Retrieve tickets for a specific event.
- **getUserTickets**: Retrieve tickets for a specific user.

### Data Storage

The Event Manager Canister uses `StableBTreeMap` data structures to store events, users, and tickets. This ensures data persistence across canister upgrades and provides efficient storage and retrieval operations.

### Error Handling

The system utilizes `Result` types to handle errors. Possible error types include NotFound, InvalidPayload, PaymentFailed, and PaymentCompleted.

### UUID Workaround

A workaround is provided to make the UUID package compatible with Azle. This enables the generation of unique identifiers for events, users, and tickets.

## Contributing

Contributions to the Event Manager Canister are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## How to deploy canisters implemented in the course

### Ledger canister

`./deploy-local-ledger.sh` - deploys a local Ledger canister. IC works differently when run locally so there is no default network token available and you have to deploy it yourself. Remember that it's not a token like ERC-20 in Ethereum, it's a native token for ICP, just deployed separately.
This canister is described in the `dfx.json`:

```json
 "ledger_canister": {
   "type": "custom",
   "candid": "https://raw.githubusercontent.com/dfinity/ic/928caf66c35627efe407006230beee60ad38f090/rs/rosetta-api/icp_ledger/ledger.did",
   "wasm": "https://download.dfinity.systems/ic/928caf66c35627efe407006230beee60ad38f090/canisters/ledger-canister.wasm.gz",
   "remote": {
     "id": {
       "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
     }
   }
 }
```

`remote.id.ic` - that is the principal of the Ledger canister and it will be available by this principal when you work with the ledger.

Also, in the scope of this script, a minter identity is created which can be used for minting tokens
for the testing purposes.
Additionally, the default identity is pre-populated with 1000_000_000_000 e8s which is equal to 10_000 * 10**8 ICP.
The decimals value for ICP is 10**8.

List identities:
`dfx identity list`

Switch to the minter identity:
`dfx identity use minter`

Transfer ICP:
`dfx ledger transfer <ADDRESS>  --memo 0 --icp 100 --fee 0`
where:

- `--memo` is some correlation id that can be set to identify some particular transactions (we use that in the marketplace canister).
- `--icp` is the transfer amount
- `--fee` is the transaction fee. In this case it's 0 because we make this transfer as the minter idenity thus this transaction is of type MINT, not TRANSFER.
- `<ADDRESS>` is the address of the recipient. To get the address from the principal, you can use the helper function from the marketplace canister - `getAddressFromPrincipal(principal: Principal)`, it can be called via the Candid UI.

### Internet identity canister

`dfx deploy internet_identity` - that is the canister that handles the authentication flow. Once it's deployed, the `js-agent` library will be talking to it to register identities. There is UI that acts as a wallet where you can select existing identities
or create a new one.

### Marketplace canister

`dfx deploy dfinity_js_backend` - deploys the marketplace canister where the business logic is implemented.
Basically, it implements functions like add, view, update, delete, and buy products + a set of helper functions.

Do not forget to run `dfx generate dfinity_js_backend` anytime you add/remove functions in the canister or when you change the signatures.
Otherwise, these changes won't be reflected in IDL's and won't work when called using the JS agent.

### Marketplace frontend canister

`dfx deploy dfinity_js_frontend` - deployes the frontend app for the `dfinity_js_backend` canister on IC.
