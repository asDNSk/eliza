// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const idlFactory = ({ IDL }) => {
    const Result = IDL.Variant({ Ok: IDL.Nat, Err: IDL.Text });
    const CreateMemeTokenArg = IDL.Record({
        creator: IDL.Opt(IDL.Principal),
        twitter: IDL.Opt(IDL.Text),
        logo: IDL.Text,
        name: IDL.Text,
        description: IDL.Text,
        website: IDL.Opt(IDL.Text),
        telegram: IDL.Opt(IDL.Text),
        symbol: IDL.Text,
    });
    const MemeToken = IDL.Record({
        id: IDL.Nat64,
        creator: IDL.Text,
        available_token: IDL.Nat,
        twitter: IDL.Opt(IDL.Text),
        volume_24h: IDL.Nat,
        logo: IDL.Text,
        name: IDL.Text,
        liquidity: IDL.Float64,
        description: IDL.Text,
        created_at: IDL.Nat64,
        website: IDL.Opt(IDL.Text),
        last_tx_time: IDL.Nat64,
        canister: IDL.Opt(IDL.Text),
        market_cap_icp: IDL.Nat,
        market_cap_usd: IDL.Float64,
        price: IDL.Float64,
        pool_canister: IDL.Opt(IDL.Text),
        telegram: IDL.Opt(IDL.Text),
        symbol: IDL.Text,
    });
    const Result_1 = IDL.Variant({ Ok: MemeToken, Err: IDL.Text });
    const StatusRequest = IDL.Record({
        memory_size: IDL.Bool,
        cycles: IDL.Bool,
        heap_memory_size: IDL.Bool,
    });
    const MetricsGranularity = IDL.Variant({
        hourly: IDL.Null,
        daily: IDL.Null,
    });
    const GetMetricsParameters = IDL.Record({
        dateToMillis: IDL.Nat,
        granularity: MetricsGranularity,
        dateFromMillis: IDL.Nat,
    });
    const MetricsRequest = IDL.Record({ parameters: GetMetricsParameters });
    const GetLogMessagesFilter = IDL.Record({
        analyzeCount: IDL.Nat32,
        messageRegex: IDL.Opt(IDL.Text),
        messageContains: IDL.Opt(IDL.Text),
    });
    const GetLogMessagesParameters = IDL.Record({
        count: IDL.Nat32,
        filter: IDL.Opt(GetLogMessagesFilter),
        fromTimeNanos: IDL.Opt(IDL.Nat64),
    });
    const GetLatestLogMessagesParameters = IDL.Record({
        upToTimeNanos: IDL.Opt(IDL.Nat64),
        count: IDL.Nat32,
        filter: IDL.Opt(GetLogMessagesFilter),
    });
    const CanisterLogRequest = IDL.Variant({
        getMessagesInfo: IDL.Null,
        getMessages: GetLogMessagesParameters,
        getLatestMessages: GetLatestLogMessagesParameters,
    });
    const GetInformationRequest = IDL.Record({
        status: IDL.Opt(StatusRequest),
        metrics: IDL.Opt(MetricsRequest),
        logs: IDL.Opt(CanisterLogRequest),
        version: IDL.Bool,
    });
    const StatusResponse = IDL.Record({
        memory_size: IDL.Opt(IDL.Nat64),
        cycles: IDL.Opt(IDL.Nat64),
        heap_memory_size: IDL.Opt(IDL.Nat64),
    });
    const HourlyMetricsData = IDL.Record({
        updateCalls: IDL.Vec(IDL.Nat64),
        canisterHeapMemorySize: IDL.Vec(IDL.Nat64),
        canisterCycles: IDL.Vec(IDL.Nat64),
        canisterMemorySize: IDL.Vec(IDL.Nat64),
        timeMillis: IDL.Int,
    });
    const NumericEntity = IDL.Record({
        avg: IDL.Nat64,
        max: IDL.Nat64,
        min: IDL.Nat64,
        first: IDL.Nat64,
        last: IDL.Nat64,
    });
    const DailyMetricsData = IDL.Record({
        updateCalls: IDL.Nat64,
        canisterHeapMemorySize: NumericEntity,
        canisterCycles: NumericEntity,
        canisterMemorySize: NumericEntity,
        timeMillis: IDL.Int,
    });
    const CanisterMetricsData = IDL.Variant({
        hourly: IDL.Vec(HourlyMetricsData),
        daily: IDL.Vec(DailyMetricsData),
    });
    const CanisterMetrics = IDL.Record({ data: CanisterMetricsData });
    const MetricsResponse = IDL.Record({ metrics: IDL.Opt(CanisterMetrics) });
    const CanisterLogFeature = IDL.Variant({
        filterMessageByContains: IDL.Null,
        filterMessageByRegex: IDL.Null,
    });
    const CanisterLogMessagesInfo = IDL.Record({
        features: IDL.Vec(IDL.Opt(CanisterLogFeature)),
        lastTimeNanos: IDL.Opt(IDL.Nat64),
        count: IDL.Nat32,
        firstTimeNanos: IDL.Opt(IDL.Nat64),
    });
    const LogMessageData = IDL.Record({
        timeNanos: IDL.Nat64,
        message: IDL.Text,
    });
    const CanisterLogMessages = IDL.Record({
        data: IDL.Vec(LogMessageData),
        lastAnalyzedMessageTimeNanos: IDL.Opt(IDL.Nat64),
    });
    const CanisterLogResponse = IDL.Variant({
        messagesInfo: CanisterLogMessagesInfo,
        messages: CanisterLogMessages,
    });
    const GetInformationResponse = IDL.Record({
        status: IDL.Opt(StatusResponse),
        metrics: IDL.Opt(MetricsResponse),
        logs: IDL.Opt(CanisterLogResponse),
        version: IDL.Opt(IDL.Nat),
    });
    const Transaction = IDL.Record({
        token_amount: IDL.Nat,
        token_id: IDL.Nat64,
        token_symbol: IDL.Text,
        from: IDL.Text,
        timestamp: IDL.Nat64,
        icp_amount: IDL.Nat,
        price: IDL.Float64,
        tx_type: IDL.Text,
    });
    const CreateCommentArg = IDL.Record({
        id: IDL.Nat64,
        content: IDL.Text,
        image: IDL.Opt(IDL.Text),
    });
    const Sort = IDL.Variant({
        CreateTimeDsc: IDL.Null,
        LastTradeDsc: IDL.Null,
        MarketCapDsc: IDL.Null,
    });
    const Candle = IDL.Record({
        low: IDL.Float64,
        high: IDL.Float64,
        close: IDL.Float64,
        open: IDL.Float64,
        timestamp: IDL.Nat64,
    });
    const Comment = IDL.Record({
        id: IDL.Nat64,
        creator: IDL.Text,
        content: IDL.Text,
        created_at: IDL.Nat64,
        image: IDL.Opt(IDL.Text),
    });
    const Holder = IDL.Record({ balance: IDL.Nat, owner: IDL.Text });
    const User = IDL.Record({
        principal: IDL.Text,
        name: IDL.Text,
        last_login_seconds: IDL.Nat64,
        register_at_second: IDL.Nat64,
        avatar: IDL.Text,
    });
    const MemeTokenView = IDL.Record({
        token: MemeToken,
        balance: IDL.Nat,
    });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const ICPSettlement = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        ledger: IDL.Principal,
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
    });
    const CollectMetricsRequestType = IDL.Variant({
        force: IDL.Null,
        normal: IDL.Null,
    });
    const UpdateInformationRequest = IDL.Record({
        metrics: IDL.Opt(CollectMetricsRequestType),
    });
    const WalletReceiveResult = IDL.Record({ accepted: IDL.Nat64 });
    return IDL.Service({
        balance: IDL.Func([IDL.Nat64], [Result], []),
        buy: IDL.Func([IDL.Nat64, IDL.Float64], [Result], []),
        calculate_buy: IDL.Func([IDL.Nat64, IDL.Float64], [Result], ["query"]),
        calculate_sell: IDL.Func([IDL.Nat64, IDL.Float64], [Result], ["query"]),
        create_token: IDL.Func([CreateMemeTokenArg], [Result_1], []),
        getCanistergeekInformation: IDL.Func(
            [GetInformationRequest],
            [GetInformationResponse],
            ["query"]
        ),
        king_of_hill: IDL.Func([], [IDL.Opt(MemeToken)], ["query"]),
        last_txs: IDL.Func([IDL.Nat64], [IDL.Vec(Transaction)], ["query"]),
        launched_canister_ids: IDL.Func([], [IDL.Vec(IDL.Text)], ["query"]),
        post_comment: IDL.Func([CreateCommentArg], [], []),
        query_all_tokens: IDL.Func(
            [IDL.Nat64, IDL.Nat64, IDL.Opt(Sort)],
            [IDL.Vec(MemeToken), IDL.Nat64],
            ["query"]
        ),
        query_token: IDL.Func([IDL.Nat64], [IDL.Opt(MemeToken)], ["query"]),
        query_token_candle: IDL.Func(
            [IDL.Nat64, IDL.Opt(IDL.Nat64)],
            [IDL.Vec(Candle)],
            ["query"]
        ),
        query_token_comments: IDL.Func(
            [IDL.Nat64, IDL.Nat64, IDL.Nat64],
            [IDL.Vec(Comment), IDL.Nat64],
            ["query"]
        ),
        query_token_holders: IDL.Func(
            [IDL.Nat64, IDL.Nat64, IDL.Nat64],
            [IDL.Vec(Holder), IDL.Nat64],
            ["query"]
        ),
        query_token_transactions: IDL.Func(
            [IDL.Nat64, IDL.Nat64, IDL.Nat64],
            [IDL.Vec(Transaction), IDL.Nat64],
            ["query"]
        ),
        query_user: IDL.Func([IDL.Opt(IDL.Principal)], [User], ["query"]),
        query_user_launched: IDL.Func(
            [IDL.Opt(IDL.Principal)],
            [IDL.Vec(MemeToken)],
            ["query"]
        ),
        query_user_tokens: IDL.Func(
            [IDL.Opt(IDL.Principal)],
            [IDL.Vec(MemeTokenView)],
            ["query"]
        ),
        sell: IDL.Func([IDL.Nat64, IDL.Float64], [Result], []),
        settlement: IDL.Func([], [IDL.Vec(ICPSettlement)], ["query"]),
        updateCanistergeekInformation: IDL.Func(
            [UpdateInformationRequest],
            [],
            []
        ),
        wallet_balance: IDL.Func([], [IDL.Nat], ["query"]),
        wallet_receive: IDL.Func([], [WalletReceiveResult], []),
        withdraw: IDL.Func([IDL.Opt(IDL.Principal)], [Result], []),
    });
};
