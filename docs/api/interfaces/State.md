<<<<<<< HEAD
[@ai16z/eliza v0.1.5-alpha.1](../index.md) / State
=======
[@elizaos/core v0.1.7](../index.md) / State
>>>>>>> origin/main

# Interface: State

Represents the current state/context of a conversation

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### userId?

> `optional` **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

ID of user who sent current message

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:240
=======
[packages/core/src/types.ts:253](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L253)
>>>>>>> origin/main

---

### agentId?

> `optional` **agentId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

ID of agent in conversation

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:243
=======
[packages/core/src/types.ts:256](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L256)
>>>>>>> origin/main

---

### bio

> **bio**: `string`

Agent's biography

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:246
=======
[packages/core/src/types.ts:259](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L259)
>>>>>>> origin/main

---

### lore

> **lore**: `string`

Agent's background lore

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:249
=======
[packages/core/src/types.ts:262](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L262)
>>>>>>> origin/main

---

### messageDirections

> **messageDirections**: `string`

Message handling directions

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:252
=======
[packages/core/src/types.ts:265](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L265)
>>>>>>> origin/main

---

### postDirections

> **postDirections**: `string`

Post handling directions

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:255
=======
[packages/core/src/types.ts:268](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L268)
>>>>>>> origin/main

---

### roomId

> **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

Current room/conversation ID

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:258
=======
[packages/core/src/types.ts:271](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L271)
>>>>>>> origin/main

---

### agentName?

> `optional` **agentName**: `string`

Optional agent name

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:261
=======
[packages/core/src/types.ts:274](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L274)
>>>>>>> origin/main

---

### senderName?

> `optional` **senderName**: `string`

Optional message sender name

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:264
=======
[packages/core/src/types.ts:277](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L277)
>>>>>>> origin/main

---

### actors

> **actors**: `string`

String representation of conversation actors

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:267
=======
[packages/core/src/types.ts:280](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L280)
>>>>>>> origin/main

---

### actorsData?

> `optional` **actorsData**: [`Actor`](Actor.md)[]

Optional array of actor objects

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:270
=======
[packages/core/src/types.ts:283](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L283)
>>>>>>> origin/main

---

### goals?

> `optional` **goals**: `string`

Optional string representation of goals

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:273
=======
[packages/core/src/types.ts:286](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L286)
>>>>>>> origin/main

---

### goalsData?

> `optional` **goalsData**: [`Goal`](Goal.md)[]

Optional array of goal objects

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:276
=======
[packages/core/src/types.ts:289](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L289)
>>>>>>> origin/main

---

### recentMessages

> **recentMessages**: `string`

Recent message history as string

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:279
=======
[packages/core/src/types.ts:292](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L292)
>>>>>>> origin/main

---

### recentMessagesData

> **recentMessagesData**: [`Memory`](Memory.md)[]

Recent message objects

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:282
=======
[packages/core/src/types.ts:295](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L295)
>>>>>>> origin/main

---

### actionNames?

> `optional` **actionNames**: `string`

Optional valid action names

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:285
=======
[packages/core/src/types.ts:298](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L298)
>>>>>>> origin/main

---

### actions?

> `optional` **actions**: `string`

Optional action descriptions

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:288
=======
[packages/core/src/types.ts:301](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L301)
>>>>>>> origin/main

---

### actionsData?

> `optional` **actionsData**: [`Action`](Action.md)[]

Optional action objects

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:291
=======
[packages/core/src/types.ts:304](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L304)
>>>>>>> origin/main

---

### actionExamples?

> `optional` **actionExamples**: `string`

Optional action examples

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:294
=======
[packages/core/src/types.ts:307](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L307)
>>>>>>> origin/main

---

### providers?

> `optional` **providers**: `string`

Optional provider descriptions

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:297
=======
[packages/core/src/types.ts:310](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L310)
>>>>>>> origin/main

---

### responseData?

> `optional` **responseData**: [`Content`](Content.md)

Optional response content

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:300
=======
[packages/core/src/types.ts:313](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L313)
>>>>>>> origin/main

---

### recentInteractionsData?

> `optional` **recentInteractionsData**: [`Memory`](Memory.md)[]

Optional recent interaction objects

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:303
=======
[packages/core/src/types.ts:316](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L316)
>>>>>>> origin/main

---

### recentInteractions?

> `optional` **recentInteractions**: `string`

Optional recent interactions string

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:306
=======
[packages/core/src/types.ts:319](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L319)
>>>>>>> origin/main

---

### formattedConversation?

> `optional` **formattedConversation**: `string`

Optional formatted conversation

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:309
=======
[packages/core/src/types.ts:322](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L322)
>>>>>>> origin/main

---

### knowledge?

> `optional` **knowledge**: `string`

Optional formatted knowledge

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:312
=======
[packages/core/src/types.ts:325](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L325)
>>>>>>> origin/main

---

### knowledgeData?

> `optional` **knowledgeData**: [`KnowledgeItem`](../type-aliases/KnowledgeItem.md)[]

Optional knowledge data

#### Defined in

<<<<<<< HEAD
packages/core/src/types.ts:314
=======
[packages/core/src/types.ts:327](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L327)
>>>>>>> origin/main
