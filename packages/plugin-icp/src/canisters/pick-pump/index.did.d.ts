import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export interface Candle {
    low: number;
    high: number;
    close: number;
    open: number;
    timestamp: bigint;
}
export type CanisterLogFeature =
    | { filterMessageByContains: null }
    | { filterMessageByRegex: null };
export interface CanisterLogMessages {
    data: Array<LogMessageData>;
    lastAnalyzedMessageTimeNanos: [] | [bigint];
}
export interface CanisterLogMessagesInfo {
    features: Array<[] | [CanisterLogFeature]>;
    lastTimeNanos: [] | [bigint];
    count: number;
    firstTimeNanos: [] | [bigint];
}
export type CanisterLogRequest =
    | { getMessagesInfo: null }
    | { getMessages: GetLogMessagesParameters }
    | { getLatestMessages: GetLatestLogMessagesParameters };
export type CanisterLogResponse =
    | { messagesInfo: CanisterLogMessagesInfo }
    | { messages: CanisterLogMessages };
export interface CanisterMetrics {
    data: CanisterMetricsData;
}
export type CanisterMetricsData =
    | { hourly: Array<HourlyMetricsData> }
    | { daily: Array<DailyMetricsData> };
export type CollectMetricsRequestType = { force: null } | { normal: null };
export interface Comment {
    id: bigint;
    creator: string;
    content: string;
    created_at: bigint;
    image: [] | [string];
}
export interface CreateCommentArg {
    id: bigint;
    content: string;
    image: [] | [string];
}
export interface CreateMemeTokenArg {
    creator: [] | [Principal];
    twitter: [] | [string];
    logo: string;
    name: string;
    description: string;
    website: [] | [string];
    telegram: [] | [string];
    symbol: string;
}
export interface DailyMetricsData {
    updateCalls: bigint;
    canisterHeapMemorySize: NumericEntity;
    canisterCycles: NumericEntity;
    canisterMemorySize: NumericEntity;
    timeMillis: bigint;
}
export interface GetInformationRequest {
    status: [] | [StatusRequest];
    metrics: [] | [MetricsRequest];
    logs: [] | [CanisterLogRequest];
    version: boolean;
}
export interface GetInformationResponse {
    status: [] | [StatusResponse];
    metrics: [] | [MetricsResponse];
    logs: [] | [CanisterLogResponse];
    version: [] | [bigint];
}
export interface GetLatestLogMessagesParameters {
    upToTimeNanos: [] | [bigint];
    count: number;
    filter: [] | [GetLogMessagesFilter];
}
export interface GetLogMessagesFilter {
    analyzeCount: number;
    messageRegex: [] | [string];
    messageContains: [] | [string];
}
export interface GetLogMessagesParameters {
    count: number;
    filter: [] | [GetLogMessagesFilter];
    fromTimeNanos: [] | [bigint];
}
export interface GetMetricsParameters {
    dateToMillis: bigint;
    granularity: MetricsGranularity;
    dateFromMillis: bigint;
}
export interface Holder {
    balance: bigint;
    owner: string;
}
export interface HourlyMetricsData {
    updateCalls: BigUint64Array | bigint[];
    canisterHeapMemorySize: BigUint64Array | bigint[];
    canisterCycles: BigUint64Array | bigint[];
    canisterMemorySize: BigUint64Array | bigint[];
    timeMillis: bigint;
}
export interface ICPSettlement {
    to: Account;
    fee: [] | [bigint];
    from_subaccount: [] | [Uint8Array | number[]];
    ledger: Principal;
    created_at_time: [] | [bigint];
    amount: bigint;
}
export interface InitArg {
    fee_receiver: Principal;
    create_token_fee: [] | [bigint];
    icp_canister_id: Principal;
    maintenance: boolean;
    fee_percentage: [] | [number];
}
export interface LogMessageData {
    timeNanos: bigint;
    message: string;
}
export interface MemeToken {
    id: bigint;
    creator: string;
    available_token: bigint;
    twitter: [] | [string];
    volume_24h: bigint;
    logo: string;
    name: string;
    liquidity: number;
    description: string;
    created_at: bigint;
    website: [] | [string];
    last_tx_time: bigint;
    canister: [] | [string];
    market_cap_icp: bigint;
    market_cap_usd: number;
    price: number;
    pool_canister: [] | [string];
    telegram: [] | [string];
    symbol: string;
}
export interface MemeTokenView {
    token: MemeToken;
    balance: bigint;
}
export type MetricsGranularity = { hourly: null } | { daily: null };
export interface MetricsRequest {
    parameters: GetMetricsParameters;
}
export interface MetricsResponse {
    metrics: [] | [CanisterMetrics];
}
export interface NumericEntity {
    avg: bigint;
    max: bigint;
    min: bigint;
    first: bigint;
    last: bigint;
}
export type Result = { Ok: bigint } | { Err: string };
export type Result_1 = { Ok: MemeToken } | { Err: string };
export type Sort =
    | { CreateTimeDsc: null }
    | { LastTradeDsc: null }
    | { MarketCapDsc: null };
export interface StatusRequest {
    memory_size: boolean;
    cycles: boolean;
    heap_memory_size: boolean;
}
export interface StatusResponse {
    memory_size: [] | [bigint];
    cycles: [] | [bigint];
    heap_memory_size: [] | [bigint];
}
export interface Transaction {
    token_amount: bigint;
    token_id: bigint;
    token_symbol: string;
    from: string;
    timestamp: bigint;
    icp_amount: bigint;
    price: number;
    tx_type: string;
}
export interface UpdateInformationRequest {
    metrics: [] | [CollectMetricsRequestType];
}
export interface User {
    principal: string;
    name: string;
    last_login_seconds: bigint;
    register_at_second: bigint;
    avatar: string;
}
export interface WalletReceiveResult {
    accepted: bigint;
}
export interface _SERVICE {
    balance: ActorMethod<[bigint], Result>;
    buy: ActorMethod<[bigint, number], Result>;
    calculate_buy: ActorMethod<[bigint, number], Result>;
    calculate_sell: ActorMethod<[bigint, number], Result>;
    create_token: ActorMethod<[CreateMemeTokenArg], Result_1>;
    getCanistergeekInformation: ActorMethod<
        [GetInformationRequest],
        GetInformationResponse
    >;
    king_of_hill: ActorMethod<[], [] | [MemeToken]>;
    last_txs: ActorMethod<[bigint], Array<Transaction>>;
    launched_canister_ids: ActorMethod<[], Array<string>>;
    post_comment: ActorMethod<[CreateCommentArg], undefined>;
    query_all_tokens: ActorMethod<
        [bigint, bigint, [] | [Sort]],
        [Array<MemeToken>, bigint]
    >;
    query_token: ActorMethod<[bigint], [] | [MemeToken]>;
    query_token_candle: ActorMethod<[bigint, [] | [bigint]], Array<Candle>>;
    query_token_comments: ActorMethod<
        [bigint, bigint, bigint],
        [Array<Comment>, bigint]
    >;
    query_token_holders: ActorMethod<
        [bigint, bigint, bigint],
        [Array<Holder>, bigint]
    >;
    query_token_transactions: ActorMethod<
        [bigint, bigint, bigint],
        [Array<Transaction>, bigint]
    >;
    query_user: ActorMethod<[[] | [Principal]], User>;
    query_user_launched: ActorMethod<[[] | [Principal]], Array<MemeToken>>;
    query_user_tokens: ActorMethod<[[] | [Principal]], Array<MemeTokenView>>;
    sell: ActorMethod<[bigint, number], Result>;
    settlement: ActorMethod<[], Array<ICPSettlement>>;
    updateCanistergeekInformation: ActorMethod<
        [UpdateInformationRequest],
        undefined
    >;
    wallet_balance: ActorMethod<[], bigint>;
    wallet_receive: ActorMethod<[], WalletReceiveResult>;
    withdraw: ActorMethod<[[] | [Principal]], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
