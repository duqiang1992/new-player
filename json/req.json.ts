IncomingMessage {
    _readableState:
        ReadableState {
        objectMode: false,
            highWaterMark: 16384,
            buffer: BufferList { head: [Object], tail: [Object], length: 1 },
        length: 32768,
            pipes: null,
            pipesCount: 0,
            flowing: null,
            ended: false,
            endEmitted: false,
            reading: false,
            sync: true,
            needReadable: false,
            emittedReadable: false,
            readableListening: false,
            resumeScheduled: false,
            defaultEncoding: 'utf8',
            ranOut: false,
            awaitDrain: 0,
            readingMore: true,
            decoder: null,
            encoding: null },
    readable: true,
        domain: null,
        _events: {},
    _eventsCount: 0,
        _maxListeners: undefined,
        socket:
    Socket {
        connecting: false,
            _hadError: false,
            _handle:
        TCP {
            bytesRead: 33405,
                _externalStream: {},
            fd: -1,
                reading: false,
                owner: [Circular],
                onread: [Function: onread],
            onconnection: null,
                writeQueueSize: 0 },
        _parent: null,
            _host: null,
            _readableState:
        ReadableState {
            objectMode: false,
                highWaterMark: 16384,
                buffer: [Object],
                length: 0,
                pipes: null,
                pipesCount: 0,
                flowing: false,
                ended: false,
                endEmitted: false,
                reading: true,
                sync: false,
                needReadable: true,
                emittedReadable: false,
                readableListening: false,
                resumeScheduled: false,
                defaultEncoding: 'utf8',
                ranOut: false,
                awaitDrain: 0,
                readingMore: false,
                decoder: null,
                encoding: null },
        readable: true,
            domain: null,
            _events:
        { end: [Object],
            finish: [Function: onSocketFinish],
            _socketEnd: [Function: onSocketEnd],
            drain: [Object],
                timeout: [Function],
            error: [Function: socketOnError],
            close: [Object],
                data: [Function: socketOnData],
            resume: [Function: onSocketResume],
            pause: [Function: onSocketPause] },
        _eventsCount: 10,
            _maxListeners: undefined,
            _writableState:
        WritableState {
            objectMode: false,
                highWaterMark: 16384,
                needDrain: false,
                ending: false,
                ended: false,
                finished: false,
                decodeStrings: false,
                defaultEncoding: 'utf8',
                length: 0,
                writing: false,
                corked: 0,
                sync: true,
                bufferProcessing: false,
                onwrite: [Function],
                writecb: null,
                writelen: 0,
                bufferedRequest: null,
                lastBufferedRequest: null,
                pendingcb: 0,
                prefinished: false,
                errorEmitted: false,
                bufferedRequestCount: 0,
                corkedRequestsFree: [Object] },
        writable: true,
            allowHalfOpen: true,
            destroyed: false,
            _bytesDispatched: 0,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server:
        Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _server:
            Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _idleTimeout: 120000,
            _idleNext:
        TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idlePrev:
            TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idleStart: 466,
            parser:
        HTTPParser {
            '0': [Function: parserOnHeaders],
            '1': [Function: parserOnHeadersComplete],
            '2': [Function: parserOnBody],
            '3': [Function: parserOnMessageComplete],
            '4': [Function: onParserExecute],
            _headers: [],
                _url: '',
                _consumed: true,
                socket: [Circular],
                incoming: [Circular],
                outgoing: null,
                maxHeaderPairs: 2000,
                onIncoming: [Function: parserOnIncoming] },
        on: [Function: socketOnWrap],
        _paused: false,
            read: [Function],
            _consuming: true,
            _httpMessage:
        ServerResponse {
            domain: null,
                _events: [Object],
                _eventsCount: 1,
                _maxListeners: undefined,
                output: [],
                outputEncodings: [],
                outputCallbacks: [],
                outputSize: 0,
                writable: true,
                _last: false,
                upgrading: false,
                chunkedEncoding: false,
                shouldKeepAlive: true,
                useChunkedEncodingByDefault: true,
                sendDate: true,
                _removedHeader: {},
            _contentLength: null,
                _hasBody: true,
                _trailer: '',
                finished: false,
                _headerSent: false,
                socket: [Circular],
                connection: [Circular],
                _header: null,
                _headers: [Object],
                _headerNames: [Object],
                _onPendingData: [Function: updateOutgoingData],
            req: [Circular],
                locals: {},
            writeHead: [Function: writeHead],
            end: [Function: end] } },
    connection:
        Socket {
        connecting: false,
            _hadError: false,
            _handle:
        TCP {
            bytesRead: 33405,
                _externalStream: {},
            fd: -1,
                reading: false,
                owner: [Circular],
                onread: [Function: onread],
            onconnection: null,
                writeQueueSize: 0 },
        _parent: null,
            _host: null,
            _readableState:
        ReadableState {
            objectMode: false,
                highWaterMark: 16384,
                buffer: [Object],
                length: 0,
                pipes: null,
                pipesCount: 0,
                flowing: false,
                ended: false,
                endEmitted: false,
                reading: true,
                sync: false,
                needReadable: true,
                emittedReadable: false,
                readableListening: false,
                resumeScheduled: false,
                defaultEncoding: 'utf8',
                ranOut: false,
                awaitDrain: 0,
                readingMore: false,
                decoder: null,
                encoding: null },
        readable: true,
            domain: null,
            _events:
        { end: [Object],
            finish: [Function: onSocketFinish],
            _socketEnd: [Function: onSocketEnd],
            drain: [Object],
                timeout: [Function],
            error: [Function: socketOnError],
            close: [Object],
                data: [Function: socketOnData],
            resume: [Function: onSocketResume],
            pause: [Function: onSocketPause] },
        _eventsCount: 10,
            _maxListeners: undefined,
            _writableState:
        WritableState {
            objectMode: false,
                highWaterMark: 16384,
                needDrain: false,
                ending: false,
                ended: false,
                finished: false,
                decodeStrings: false,
                defaultEncoding: 'utf8',
                length: 0,
                writing: false,
                corked: 0,
                sync: true,
                bufferProcessing: false,
                onwrite: [Function],
                writecb: null,
                writelen: 0,
                bufferedRequest: null,
                lastBufferedRequest: null,
                pendingcb: 0,
                prefinished: false,
                errorEmitted: false,
                bufferedRequestCount: 0,
                corkedRequestsFree: [Object] },
        writable: true,
            allowHalfOpen: true,
            destroyed: false,
            _bytesDispatched: 0,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server:
        Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _server:
            Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _idleTimeout: 120000,
            _idleNext:
        TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idlePrev:
            TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idleStart: 466,
            parser:
        HTTPParser {
            '0': [Function: parserOnHeaders],
            '1': [Function: parserOnHeadersComplete],
            '2': [Function: parserOnBody],
            '3': [Function: parserOnMessageComplete],
            '4': [Function: onParserExecute],
            _headers: [],
                _url: '',
                _consumed: true,
                socket: [Circular],
                incoming: [Circular],
                outgoing: null,
                maxHeaderPairs: 2000,
                onIncoming: [Function: parserOnIncoming] },
        on: [Function: socketOnWrap],
        _paused: false,
            read: [Function],
            _consuming: true,
            _httpMessage:
        ServerResponse {
            domain: null,
                _events: [Object],
                _eventsCount: 1,
                _maxListeners: undefined,
                output: [],
                outputEncodings: [],
                outputCallbacks: [],
                outputSize: 0,
                writable: true,
                _last: false,
                upgrading: false,
                chunkedEncoding: false,
                shouldKeepAlive: true,
                useChunkedEncodingByDefault: true,
                sendDate: true,
                _removedHeader: {},
            _contentLength: null,
                _hasBody: true,
                _trailer: '',
                finished: false,
                _headerSent: false,
                socket: [Circular],
                connection: [Circular],
                _header: null,
                _headers: [Object],
                _headerNames: [Object],
                _onPendingData: [Function: updateOutgoingData],
            req: [Circular],
                locals: {},
            writeHead: [Function: writeHead],
            end: [Function: end] } },
    httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: false,
        headers:
    { host: 'localhost:4000',
        connection: 'keep-alive',
        'content-length': '106811',
        accept: '*/*',
        origin: 'http://localhost:4000',
        'x-requested-with': 'XMLHttpRequest',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygNFRjSY0KGlDBC7F',
        referer: 'http://localhost:4000/kejiantianjia',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.8',
        cookie: 'connect.sid=s%3AyXWUCejRkb8rSOAwM6KXFYXbeUmKBjy7.96VC2nBHFsiVdfO2mePx4LD1GvIfngZ0njYpVoczcZQ; yhid=1; yhtx=images/defaultPhoto.jpg' },
    rawHeaders:
        [ 'Host',
            'localhost:4000',
            'Connection',
            'keep-alive',
            'Content-Length',
            '106811',
            'Accept',
            '*/*',
            'Origin',
            'http://localhost:4000',
            'X-Requested-With',
            'XMLHttpRequest',
            'User-Agent',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Content-Type',
            'multipart/form-data; boundary=----WebKitFormBoundarygNFRjSY0KGlDBC7F',
            'Referer',
            'http://localhost:4000/kejiantianjia',
            'Accept-Encoding',
            'gzip, deflate, br',
            'Accept-Language',
            'zh-CN,zh;q=0.8',
            'Cookie',
            'connect.sid=s%3AyXWUCejRkb8rSOAwM6KXFYXbeUmKBjy7.96VC2nBHFsiVdfO2mePx4LD1GvIfngZ0njYpVoczcZQ; yhid=1; yhtx=images/defaultPhoto.jpg' ],
            trailers: {},
    rawTrailers: [],
        upgrade: false,
        url: '/postForm',
        method: 'POST',
        statusCode: null,
        statusMessage: null,
        client:
    Socket {
        connecting: false,
            _hadError: false,
            _handle:
        TCP {
            bytesRead: 33405,
                _externalStream: {},
            fd: -1,
                reading: false,
                owner: [Circular],
                onread: [Function: onread],
            onconnection: null,
                writeQueueSize: 0 },
        _parent: null,
            _host: null,
            _readableState:
        ReadableState {
            objectMode: false,
                highWaterMark: 16384,
                buffer: [Object],
                length: 0,
                pipes: null,
                pipesCount: 0,
                flowing: false,
                ended: false,
                endEmitted: false,
                reading: true,
                sync: false,
                needReadable: true,
                emittedReadable: false,
                readableListening: false,
                resumeScheduled: false,
                defaultEncoding: 'utf8',
                ranOut: false,
                awaitDrain: 0,
                readingMore: false,
                decoder: null,
                encoding: null },
        readable: true,
            domain: null,
            _events:
        { end: [Object],
            finish: [Function: onSocketFinish],
            _socketEnd: [Function: onSocketEnd],
            drain: [Object],
                timeout: [Function],
            error: [Function: socketOnError],
            close: [Object],
                data: [Function: socketOnData],
            resume: [Function: onSocketResume],
            pause: [Function: onSocketPause] },
        _eventsCount: 10,
            _maxListeners: undefined,
            _writableState:
        WritableState {
            objectMode: false,
                highWaterMark: 16384,
                needDrain: false,
                ending: false,
                ended: false,
                finished: false,
                decodeStrings: false,
                defaultEncoding: 'utf8',
                length: 0,
                writing: false,
                corked: 0,
                sync: true,
                bufferProcessing: false,
                onwrite: [Function],
                writecb: null,
                writelen: 0,
                bufferedRequest: null,
                lastBufferedRequest: null,
                pendingcb: 0,
                prefinished: false,
                errorEmitted: false,
                bufferedRequestCount: 0,
                corkedRequestsFree: [Object] },
        writable: true,
            allowHalfOpen: true,
            destroyed: false,
            _bytesDispatched: 0,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server:
        Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _server:
            Server {
            domain: null,
                _events: [Object],
                _eventsCount: 2,
                _maxListeners: undefined,
                _connections: 1,
                _handle: [Object],
                _usingSlaves: false,
                _slaves: [],
                _unref: false,
                allowHalfOpen: true,
                pauseOnConnect: false,
                httpAllowHalfOpen: false,
                timeout: 120000,
                _pendingResponseData: 0,
                _connectionKey: '6::::4000' },
        _idleTimeout: 120000,
            _idleNext:
        TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idlePrev:
            TimersList {
            _idleNext: [Circular],
                _idlePrev: [Circular],
                _timer: [Object],
                _unrefed: true,
                msecs: 120000 },
        _idleStart: 466,
            parser:
        HTTPParser {
            '0': [Function: parserOnHeaders],
            '1': [Function: parserOnHeadersComplete],
            '2': [Function: parserOnBody],
            '3': [Function: parserOnMessageComplete],
            '4': [Function: onParserExecute],
            _headers: [],
                _url: '',
                _consumed: true,
                socket: [Circular],
                incoming: [Circular],
                outgoing: null,
                maxHeaderPairs: 2000,
                onIncoming: [Function: parserOnIncoming] },
        on: [Function: socketOnWrap],
        _paused: false,
            read: [Function],
            _consuming: true,
            _httpMessage:
        ServerResponse {
            domain: null,
                _events: [Object],
                _eventsCount: 1,
                _maxListeners: undefined,
                output: [],
                outputEncodings: [],
                outputCallbacks: [],
                outputSize: 0,
                writable: true,
                _last: false,
                upgrading: false,
                chunkedEncoding: false,
                shouldKeepAlive: true,
                useChunkedEncodingByDefault: true,
                sendDate: true,
                _removedHeader: {},
            _contentLength: null,
                _hasBody: true,
                _trailer: '',
                finished: false,
                _headerSent: false,
                socket: [Circular],
                connection: [Circular],
                _header: null,
                _headers: [Object],
                _headerNames: [Object],
                _onPendingData: [Function: updateOutgoingData],
            req: [Circular],
                locals: {},
            writeHead: [Function: writeHead],
            end: [Function: end] } },
    _consuming: false,
        _dumped: false,
        next: [Function: next],
    baseUrl: '',
        originalUrl: '/postForm',
        _parsedUrl:
    Url {
        protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: null,
            query: null,
            pathname: '/postForm',
            path: '/postForm',
            href: '/postForm',
            _raw: '/postForm' },
    params: {},
    query: {},
    res:
        ServerResponse {
        domain: null,
            _events: { finish: [Function: resOnFinish] },
        _eventsCount: 1,
            _maxListeners: undefined,
            output: [],
            outputEncodings: [],
            outputCallbacks: [],
            outputSize: 0,
            writable: true,
            _last: false,
            upgrading: false,
            chunkedEncoding: false,
            shouldKeepAlive: true,
            useChunkedEncodingByDefault: true,
            sendDate: true,
            _removedHeader: {},
        _contentLength: null,
            _hasBody: true,
            _trailer: '',
            finished: false,
            _headerSent: false,
            socket:
        Socket {
            connecting: false,
                _hadError: false,
                _handle: [Object],
                _parent: null,
                _host: null,
                _readableState: [Object],
                readable: true,
                domain: null,
                _events: [Object],
                _eventsCount: 10,
                _maxListeners: undefined,
                _writableState: [Object],
                writable: true,
                allowHalfOpen: true,
                destroyed: false,
                _bytesDispatched: 0,
                _sockname: null,
                _pendingData: null,
                _pendingEncoding: '',
                server: [Object],
                _server: [Object],
                _idleTimeout: 120000,
                _idleNext: [Object],
                _idlePrev: [Object],
                _idleStart: 466,
                parser: [Object],
                on: [Function: socketOnWrap],
            _paused: false,
                read: [Function],
                _consuming: true,
                _httpMessage: [Circular] },
        connection:
            Socket {
            connecting: false,
                _hadError: false,
                _handle: [Object],
                _parent: null,
                _host: null,
                _readableState: [Object],
                readable: true,
                domain: null,
                _events: [Object],
                _eventsCount: 10,
                _maxListeners: undefined,
                _writableState: [Object],
                writable: true,
                allowHalfOpen: true,
                destroyed: false,
                _bytesDispatched: 0,
                _sockname: null,
                _pendingData: null,
                _pendingEncoding: '',
                server: [Object],
                _server: [Object],
                _idleTimeout: 120000,
                _idleNext: [Object],
                _idlePrev: [Object],
                _idleStart: 466,
                parser: [Object],
                on: [Function: socketOnWrap],
            _paused: false,
                read: [Function],
                _consuming: true,
                _httpMessage: [Circular] },
        _header: null,
            _headers: { 'x-powered-by': 'Express' },
        _headerNames: { 'x-powered-by': 'X-Powered-By' },
        _onPendingData: [Function: updateOutgoingData],
        req: [Circular],
            locals: {},
        writeHead: [Function: writeHead],
        end: [Function: end] },
    body: {},
    secret: undefined,
        cookies:
    { 'connect.sid': 's:yXWUCejRkb8rSOAwM6KXFYXbeUmKBjy7.96VC2nBHFsiVdfO2mePx4LD1GvIfngZ0njYpVoczcZQ',
        yhid: '1',
        yhtx: 'images/defaultPhoto.jpg' },
    signedCookies: {},
    _parsedOriginalUrl:
        Url {
        protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: null,
            query: null,
            pathname: '/postForm',
            path: '/postForm',
            href: '/postForm',
            _raw: '/postForm' },
    sessionStore:
        MemoryStore {
        domain: null,
            _events:
        { disconnect: [Function: ondisconnect],
            connect: [Function: onconnect] },
        _eventsCount: 2,
            _maxListeners: undefined,
            sessions: {},
        generate: [Function] },
    sessionID: 'SyQGmAqabxd6-sFOjyF0cljjbIaQJjEo',
        session:
    Session {
        cookie:
        { path: '/',
            _expires: 2017-03-17T06:13:44.499Z,
            originalMaxAge: 1200000,
            httpOnly: true } },
    route:
        Route {
        path: '/postForm',
            stack: [ [Object] ],
            methods: { post: true } } }
]