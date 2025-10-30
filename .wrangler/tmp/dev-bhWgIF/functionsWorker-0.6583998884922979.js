var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-yqEZEt/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-Gca0Yl/functionsWorker-0.6583998884922979.mjs
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL2, "checkURL");
var urls2;
var init_checked_fetch = __esm({
  "../.wrangler/tmp/bundle-cWrW8v/checked-fetch.js"() {
    urls2 = /* @__PURE__ */ new Set();
    __name2(checkURL2, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL2(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
__name(__rest, "__rest");
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  __name2(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    __name2(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    __name2(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    __name2(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
__name(__awaiter, "__awaiter");
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(__rest, "__rest");
    __name2(__awaiter, "__awaiter");
  }
});
var browser_exports = {};
__export(browser_exports, {
  Headers: /* @__PURE__ */ __name(() => Headers2, "Headers"),
  Request: /* @__PURE__ */ __name(() => Request2, "Request"),
  Response: /* @__PURE__ */ __name(() => Response2, "Response"),
  default: /* @__PURE__ */ __name(() => browser_default, "default"),
  fetch: /* @__PURE__ */ __name(() => fetch2, "fetch")
});
var getGlobal;
var globalObject;
var fetch2;
var browser_default;
var Headers2;
var Request2;
var Response2;
var init_browser = __esm({
  "node_modules/@supabase/node-fetch/browser.js"() {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    getGlobal = /* @__PURE__ */ __name2(function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    }, "getGlobal");
    globalObject = getGlobal();
    fetch2 = globalObject.fetch;
    browser_default = globalObject.fetch.bind(globalObject);
    Headers2 = globalObject.Headers;
    Request2 = globalObject.Request;
    Response2 = globalObject.Response;
  }
});
var resolveFetch;
var init_helper = __esm({
  "node_modules/@supabase/functions-js/dist/module/helper.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    resolveFetch = /* @__PURE__ */ __name2((customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = /* @__PURE__ */ __name2((...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)), "_fetch");
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    }, "resolveFetch");
  }
});
var FunctionsError;
var FunctionsFetchError;
var FunctionsRelayError;
var FunctionsHttpError;
var FunctionRegion;
var init_types = __esm({
  "node_modules/@supabase/functions-js/dist/module/types.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    FunctionsError = class extends Error {
      static {
        __name(this, "FunctionsError");
      }
      static {
        __name2(this, "FunctionsError");
      }
      constructor(message, name = "FunctionsError", context) {
        super(message);
        this.name = name;
        this.context = context;
      }
    };
    FunctionsFetchError = class extends FunctionsError {
      static {
        __name(this, "FunctionsFetchError");
      }
      static {
        __name2(this, "FunctionsFetchError");
      }
      constructor(context) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
      }
    };
    FunctionsRelayError = class extends FunctionsError {
      static {
        __name(this, "FunctionsRelayError");
      }
      static {
        __name2(this, "FunctionsRelayError");
      }
      constructor(context) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
      }
    };
    FunctionsHttpError = class extends FunctionsError {
      static {
        __name(this, "FunctionsHttpError");
      }
      static {
        __name2(this, "FunctionsHttpError");
      }
      constructor(context) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
      }
    };
    (function(FunctionRegion2) {
      FunctionRegion2["Any"] = "any";
      FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
      FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
      FunctionRegion2["ApSouth1"] = "ap-south-1";
      FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
      FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
      FunctionRegion2["CaCentral1"] = "ca-central-1";
      FunctionRegion2["EuCentral1"] = "eu-central-1";
      FunctionRegion2["EuWest1"] = "eu-west-1";
      FunctionRegion2["EuWest2"] = "eu-west-2";
      FunctionRegion2["EuWest3"] = "eu-west-3";
      FunctionRegion2["SaEast1"] = "sa-east-1";
      FunctionRegion2["UsEast1"] = "us-east-1";
      FunctionRegion2["UsWest1"] = "us-west-1";
      FunctionRegion2["UsWest2"] = "us-west-2";
    })(FunctionRegion || (FunctionRegion = {}));
  }
});
var FunctionsClient;
var init_FunctionsClient = __esm({
  "node_modules/@supabase/functions-js/dist/module/FunctionsClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_helper();
    init_types();
    FunctionsClient = class {
      static {
        __name(this, "FunctionsClient");
      }
      static {
        __name2(this, "FunctionsClient");
      }
      constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = resolveFetch(customFetch);
      }
      /**
       * Updates the authorization header
       * @param token - the new jwt token sent in the authorisation header
       */
      setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
      }
      /**
       * Invokes a function
       * @param functionName - The name of the Function to invoke.
       * @param options - Options for invoking the Function.
       */
      invoke(functionName_1) {
        return __awaiter(this, arguments, void 0, function* (functionName, options = {}) {
          var _a2;
          try {
            const { headers, method, body: functionArgs, signal } = options;
            let _headers = {};
            let { region } = options;
            if (!region) {
              region = this.region;
            }
            const url = new URL(`${this.url}/${functionName}`);
            if (region && region !== "any") {
              _headers["x-region"] = region;
              url.searchParams.set("forceFunctionRegion", region);
            }
            let body;
            if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
              if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                _headers["Content-Type"] = "application/octet-stream";
                body = functionArgs;
              } else if (typeof functionArgs === "string") {
                _headers["Content-Type"] = "text/plain";
                body = functionArgs;
              } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                body = functionArgs;
              } else {
                _headers["Content-Type"] = "application/json";
                body = JSON.stringify(functionArgs);
              }
            } else {
              body = functionArgs;
            }
            const response = yield this.fetch(url.toString(), {
              method: method || "POST",
              // headers priority is (high to low):
              // 1. invoke-level headers
              // 2. client-level headers
              // 3. default Content-Type header
              headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
              body,
              signal
            }).catch((fetchError) => {
              if (fetchError.name === "AbortError") {
                throw fetchError;
              }
              throw new FunctionsFetchError(fetchError);
            });
            const isRelayError = response.headers.get("x-relay-error");
            if (isRelayError && isRelayError === "true") {
              throw new FunctionsRelayError(response);
            }
            if (!response.ok) {
              throw new FunctionsHttpError(response);
            }
            let responseType = ((_a2 = response.headers.get("Content-Type")) !== null && _a2 !== void 0 ? _a2 : "text/plain").split(";")[0].trim();
            let data;
            if (responseType === "application/json") {
              data = yield response.json();
            } else if (responseType === "application/octet-stream" || responseType === "application/pdf") {
              data = yield response.blob();
            } else if (responseType === "text/event-stream") {
              data = response;
            } else if (responseType === "multipart/form-data") {
              data = yield response.formData();
            } else {
              data = yield response.text();
            }
            return { data, error: null, response };
          } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
              return { data: null, error: new FunctionsFetchError(error) };
            }
            return {
              data: null,
              error,
              response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : void 0
            };
          }
        });
      }
    };
  }
});
var init_module = __esm({
  "node_modules/@supabase/functions-js/dist/module/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_FunctionsClient();
  }
});
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    var __extends;
    var __assign;
    var __rest2;
    var __decorate;
    var __param;
    var __esDecorate;
    var __runInitializers;
    var __propKey;
    var __setFunctionName;
    var __metadata;
    var __awaiter2;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __classPrivateFieldIn;
    var __createBinding;
    var __addDisposableResource;
    var __disposeResources;
    var __rewriteRelativeImportExtension;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
      __name(createExporter, "createExporter");
      __name2(createExporter, "createExporter");
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
      __extends = /* @__PURE__ */ __name2(function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        __name2(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }, "__extends");
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      __rest2 = /* @__PURE__ */ __name2(function(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      }, "__rest");
      __decorate = /* @__PURE__ */ __name2(function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }, "__decorate");
      __param = /* @__PURE__ */ __name2(function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      }, "__param");
      __esDecorate = /* @__PURE__ */ __name2(function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) {
          if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
          return f;
        }
        __name(accept, "accept");
        __name2(accept, "accept");
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access) context.access[p] = contextIn.access[p];
          context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
          };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
          } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
          }
        }
        if (target) Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
      }, "__esDecorate");
      __runInitializers = /* @__PURE__ */ __name2(function(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
      }, "__runInitializers");
      __propKey = /* @__PURE__ */ __name2(function(x) {
        return typeof x === "symbol" ? x : "".concat(x);
      }, "__propKey");
      __setFunctionName = /* @__PURE__ */ __name2(function(f, name, prefix) {
        if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
      }, "__setFunctionName");
      __metadata = /* @__PURE__ */ __name2(function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
      }, "__metadata");
      __awaiter2 = /* @__PURE__ */ __name2(function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        __name(adopt, "adopt");
        __name2(adopt, "adopt");
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          __name(fulfilled, "fulfilled");
          __name2(fulfilled, "fulfilled");
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          __name(rejected, "rejected");
          __name2(rejected, "rejected");
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          __name(step, "step");
          __name2(step, "step");
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }, "__awaiter");
      __generator = /* @__PURE__ */ __name2(function(thisArg, body) {
        var _ = { label: 0, sent: /* @__PURE__ */ __name2(function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, "sent"), trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        __name(verb, "verb");
        __name2(verb, "verb");
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
        __name(step, "step");
        __name2(step, "step");
      }, "__generator");
      __exportStar = /* @__PURE__ */ __name2(function(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
      }, "__exportStar");
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: /* @__PURE__ */ __name2(function() {
            return m[k];
          }, "get") };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      };
      __values = /* @__PURE__ */ __name2(function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: /* @__PURE__ */ __name2(function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }, "next")
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, "__values");
      __read = /* @__PURE__ */ __name2(function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      }, "__read");
      __spread = /* @__PURE__ */ __name2(function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      }, "__spread");
      __spreadArrays = /* @__PURE__ */ __name2(function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      }, "__spreadArrays");
      __spreadArray = /* @__PURE__ */ __name2(function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      }, "__spreadArray");
      __await = /* @__PURE__ */ __name2(function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }, "__await");
      __asyncGenerator = /* @__PURE__ */ __name2(function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function awaitReturn(f) {
          return function(v) {
            return Promise.resolve(v).then(f, reject);
          };
        }
        __name(awaitReturn, "awaitReturn");
        __name2(awaitReturn, "awaitReturn");
        function verb(n, f) {
          if (g[n]) {
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
            if (f) i[n] = f(i[n]);
          }
        }
        __name(verb, "verb");
        __name2(verb, "verb");
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        __name(resume, "resume");
        __name2(resume, "resume");
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        __name(step, "step");
        __name2(step, "step");
        function fulfill(value) {
          resume("next", value);
        }
        __name(fulfill, "fulfill");
        __name2(fulfill, "fulfill");
        function reject(value) {
          resume("throw", value);
        }
        __name(reject, "reject");
        __name2(reject, "reject");
        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
        __name(settle, "settle");
        __name2(settle, "settle");
      }, "__asyncGenerator");
      __asyncDelegator = /* @__PURE__ */ __name2(function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
          } : f;
        }
        __name(verb, "verb");
        __name2(verb, "verb");
      }, "__asyncDelegator");
      __asyncValues = /* @__PURE__ */ __name2(function(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        __name(verb, "verb");
        __name2(verb, "verb");
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
        __name(settle, "settle");
        __name2(settle, "settle");
      }, "__asyncValues");
      __makeTemplateObject = /* @__PURE__ */ __name2(function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      }, "__makeTemplateObject");
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      var ownKeys = /* @__PURE__ */ __name2(function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      }, "ownKeys");
      __importStar = /* @__PURE__ */ __name2(function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      }, "__importStar");
      __importDefault = /* @__PURE__ */ __name2(function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      }, "__importDefault");
      __classPrivateFieldGet = /* @__PURE__ */ __name2(function(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }, "__classPrivateFieldGet");
      __classPrivateFieldSet = /* @__PURE__ */ __name2(function(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      }, "__classPrivateFieldSet");
      __classPrivateFieldIn = /* @__PURE__ */ __name2(function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      }, "__classPrivateFieldIn");
      __addDisposableResource = /* @__PURE__ */ __name2(function(env, value, async) {
        if (value !== null && value !== void 0) {
          if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
          var dispose, inner;
          if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
          }
          if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
          if (inner) dispose = /* @__PURE__ */ __name2(function() {
            try {
              inner.call(this);
            } catch (e) {
              return Promise.reject(e);
            }
          }, "dispose");
          env.stack.push({ value, dispose, async });
        } else if (async) {
          env.stack.push({ async: true });
        }
        return value;
      }, "__addDisposableResource");
      var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      __disposeResources = /* @__PURE__ */ __name2(function(env) {
        function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
        }
        __name(fail, "fail");
        __name2(fail, "fail");
        var r, s = 0;
        function next() {
          while (r = env.stack.pop()) {
            try {
              if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
              if (r.dispose) {
                var result = r.dispose.call(r.value);
                if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                  fail(e);
                  return next();
                });
              } else s |= 1;
            } catch (e) {
              fail(e);
            }
          }
          if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
          if (env.hasError) throw env.error;
        }
        __name(next, "next");
        __name2(next, "next");
        return next();
      }, "__disposeResources");
      __rewriteRelativeImportExtension = /* @__PURE__ */ __name2(function(path, preserveJsx) {
        if (typeof path === "string" && /^\.\.?\//.test(path)) {
          return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
          });
        }
        return path;
      }, "__rewriteRelativeImportExtension");
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__esDecorate", __esDecorate);
      exporter("__runInitializers", __runInitializers);
      exporter("__propKey", __propKey);
      exporter("__setFunctionName", __setFunctionName);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn);
      exporter("__addDisposableResource", __addDisposableResource);
      exporter("__disposeResources", __disposeResources);
      exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
    });
  }
});
var require_PostgrestError = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestError2 = class extends Error {
      static {
        __name(this, "PostgrestError2");
      }
      static {
        __name2(this, "PostgrestError");
      }
      constructor(context) {
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
      }
    };
    exports.default = PostgrestError2;
  }
});
var require_PostgrestBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var node_fetch_1 = tslib_1.__importDefault((init_browser(), __toCommonJS(browser_exports)));
    var PostgrestError_1 = tslib_1.__importDefault(require_PostgrestError());
    var PostgrestBuilder2 = class {
      static {
        __name(this, "PostgrestBuilder2");
      }
      static {
        __name2(this, "PostgrestBuilder");
      }
      constructor(builder) {
        var _a2, _b;
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_a2 = builder.shouldThrowOnError) !== null && _a2 !== void 0 ? _a2 : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_b = builder.isMaybeSingle) !== null && _b !== void 0 ? _b : false;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = node_fetch_1.default;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Set an HTTP header for the request.
       */
      setHeader(name, value) {
        this.headers = new Headers(this.headers);
        this.headers.set(name, value);
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers.set("Accept-Profile", this.schema);
        } else {
          this.headers.set("Content-Profile", this.schema);
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers.set("Content-Type", "application/json");
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a2, _b, _c, _d;
          let error = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body = await res2.text();
              if (body === "") {
              } else if (this.headers.get("Accept") === "text/csv") {
                data = body;
              } else if (this.headers.get("Accept") && ((_a2 = this.headers.get("Accept")) === null || _a2 === void 0 ? void 0 : _a2.includes("application/vnd.pgrst.plan+text"))) {
                data = body;
              } else {
                data = JSON.parse(body);
              }
            }
            const countHeader = (_b = this.headers.get("Prefer")) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
            const contentRange = (_c = res2.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
              if (data.length > 1) {
                error = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data.length === 1) {
                data = data[0];
              } else {
                data = null;
              }
            }
          } else {
            const body = await res2.text();
            try {
              error = JSON.parse(body);
              if (Array.isArray(error) && res2.status === 404) {
                data = [];
                error = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_e) {
              if (res2.status === 404 && body === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error = {
                  message: body
                };
              }
            }
            if (error && this.isMaybeSingle && ((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d.includes("0 rows"))) {
              error = null;
              status = 200;
              statusText = "OK";
            }
            if (error && this.shouldThrowOnError) {
              throw new PostgrestError_1.default(error);
            }
          }
          const postgrestResponse = {
            error,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a2, _b, _c;
            return {
              error: {
                message: `${(_a2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a2 !== void 0 ? _a2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Override the type of the returned `data` field in the response.
       *
       * @typeParam NewResult - The new type to cast the response data to
       * @typeParam Options - Optional type configuration (defaults to { merge: true })
       * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
       * @example
       * ```typescript
       * // Merge with existing types (default behavior)
       * const query = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ custom_field: string }>()
       *
       * // Replace existing types completely
       * const replaceQuery = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
       * ```
       * @returns A PostgrestBuilder instance with the new type
       */
      overrideTypes() {
        return this;
      }
    };
    exports.default = PostgrestBuilder2;
  }
});
var require_PostgrestTransformBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestBuilder_1 = tslib_1.__importDefault(require_PostgrestBuilder());
    var PostgrestTransformBuilder2 = class extends PostgrestBuilder_1.default {
      static {
        __name(this, "PostgrestTransformBuilder2");
      }
      static {
        __name2(this, "PostgrestTransformBuilder");
      }
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        this.headers.append("Prefer", "return=representation");
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order referenced tables, but it only affects the ordering of the
       * parent table if you use `!inner` in the query.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.referencedTable - Set this to order a referenced table by
       * its columns
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
      }
      /**
       * Limit the query result by starting at an offset `from` and ending at the offset `to`.
       * Only records within this range are returned.
       * This respects the query order and if there is no order clause the range could behave unexpectedly.
       * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
       * and fourth rows of the query.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers.set("Accept", "application/vnd.pgrst.object+json");
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers.set("Accept", "application/json");
        } else {
          this.headers.set("Accept", "application/vnd.pgrst.object+json");
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers.set("Accept", "text/csv");
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers.set("Accept", "application/geo+json");
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * You need to enable the
       * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
       * setting before using this method.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _a2;
        const options = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_a2 = this.headers.get("Accept")) !== null && _a2 !== void 0 ? _a2 : "application/json";
        this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
        if (format === "json") {
          return this;
        } else {
          return this;
        }
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        this.headers.append("Prefer", "tx=rollback");
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Set the maximum number of rows that can be affected by the query.
       * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
       *
       * @param value - The maximum number of rows that can be affected
       */
      maxAffected(value) {
        this.headers.append("Prefer", "handling=strict");
        this.headers.append("Prefer", `max-affected=${value}`);
        return this;
      }
    };
    exports.default = PostgrestTransformBuilder2;
  }
});
var require_PostgrestFilterBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestTransformBuilder_1 = tslib_1.__importDefault(require_PostgrestTransformBuilder());
    var PostgrestReservedCharsRegexp = new RegExp("[,()]");
    var PostgrestFilterBuilder2 = class extends PostgrestTransformBuilder_1.default {
      static {
        __name(this, "PostgrestFilterBuilder2");
      }
      static {
        __name2(this, "PostgrestFilterBuilder");
      }
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = Array.from(new Set(values)).map((s) => {
          if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s))
            return `"${s}"`;
          else
            return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param options - Named parameters
       * @param options.referencedTable - Set this to filter on referenced tables
       * instead of the parent table
       * @param options.foreignTable - Deprecated, use `referencedTable` instead
       */
      or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
    exports.default = PostgrestFilterBuilder2;
  }
});
var require_PostgrestQueryBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    var PostgrestQueryBuilder2 = class {
      static {
        __name(this, "PostgrestQueryBuilder2");
      }
      static {
        __name2(this, "PostgrestQueryBuilder");
      }
      constructor(url, { headers = {}, schema, fetch: fetch3 }) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, options) {
        const { head: head2 = false, count } = options !== null && options !== void 0 ? options : {};
        const method = head2 ? "HEAD" : "GET";
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. Only applies for bulk
       * inserts.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        var _a2;
        const method = "POST";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", `missing=default`);
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        var _a2;
        const method = "POST";
        this.headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", "missing=default");
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        var _a2;
        const method = "PATCH";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        var _a2;
        const method = "DELETE";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
    };
    exports.default = PostgrestQueryBuilder2;
  }
});
var require_PostgrestClient = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestQueryBuilder_1 = tslib_1.__importDefault(require_PostgrestQueryBuilder());
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    var PostgrestClient2 = class _PostgrestClient {
      static {
        __name(this, "_PostgrestClient");
      }
      static {
        __name2(this, "PostgrestClient");
      }
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers = {}, schema, fetch: fetch3 } = {}) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder_1.default(url, {
          headers: new Headers(this.headers),
          schema: this.schemaName,
          fetch: this.fetch
        });
      }
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return new _PostgrestClient(this.url, {
          headers: this.headers,
          schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.get - When set to `true`, the function will be called with
       * read-only access mode.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head: head2 = false, get: get2 = false, count } = {}) {
        var _a2;
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head2 || get2) {
          method = head2 ? "HEAD" : "GET";
          Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
            url.searchParams.append(name, value);
          });
        } else {
          method = "POST";
          body = args;
        }
        const headers = new Headers(this.headers);
        if (count) {
          headers.set("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url,
          headers,
          schema: this.schemaName,
          body,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
    };
    exports.default = PostgrestClient2;
  }
});
var require_cjs = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgrestError = exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
    var tslib_1 = require_tslib();
    var PostgrestClient_1 = tslib_1.__importDefault(require_PostgrestClient());
    exports.PostgrestClient = PostgrestClient_1.default;
    var PostgrestQueryBuilder_1 = tslib_1.__importDefault(require_PostgrestQueryBuilder());
    exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
    var PostgrestTransformBuilder_1 = tslib_1.__importDefault(require_PostgrestTransformBuilder());
    exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
    var PostgrestBuilder_1 = tslib_1.__importDefault(require_PostgrestBuilder());
    exports.PostgrestBuilder = PostgrestBuilder_1.default;
    var PostgrestError_1 = tslib_1.__importDefault(require_PostgrestError());
    exports.PostgrestError = PostgrestError_1.default;
    exports.default = {
      PostgrestClient: PostgrestClient_1.default,
      PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
      PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
      PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
      PostgrestBuilder: PostgrestBuilder_1.default,
      PostgrestError: PostgrestError_1.default
    };
  }
});
var index;
var PostgrestClient;
var PostgrestQueryBuilder;
var PostgrestFilterBuilder;
var PostgrestTransformBuilder;
var PostgrestBuilder;
var PostgrestError;
var init_wrapper = __esm({
  "node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    index = __toESM(require_cjs(), 1);
    ({
      PostgrestClient,
      PostgrestQueryBuilder,
      PostgrestFilterBuilder,
      PostgrestTransformBuilder,
      PostgrestBuilder,
      PostgrestError
    } = index.default || index);
  }
});
var WebSocketFactory;
var websocket_factory_default;
var init_websocket_factory = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    WebSocketFactory = class {
      static {
        __name(this, "WebSocketFactory");
      }
      static {
        __name2(this, "WebSocketFactory");
      }
      static detectEnvironment() {
        var _a2;
        if (typeof WebSocket !== "undefined") {
          return { type: "native", constructor: WebSocket };
        }
        if (typeof globalThis !== "undefined" && typeof globalThis.WebSocket !== "undefined") {
          return { type: "native", constructor: globalThis.WebSocket };
        }
        if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
          return { type: "native", constructor: global.WebSocket };
        }
        if (typeof globalThis !== "undefined" && typeof globalThis.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") {
          return {
            type: "cloudflare",
            error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
            workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
          };
        }
        if (typeof globalThis !== "undefined" && globalThis.EdgeRuntime || typeof navigator !== "undefined" && ((_a2 = "Cloudflare-Workers") === null || _a2 === void 0 ? void 0 : _a2.includes("Vercel-Edge"))) {
          return {
            type: "unsupported",
            error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
            workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
          };
        }
        if (typeof process !== "undefined") {
          const processVersions = process["versions"];
          if (processVersions && processVersions["node"]) {
            const versionString = processVersions["node"];
            const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
            if (nodeVersion >= 22) {
              if (typeof globalThis.WebSocket !== "undefined") {
                return { type: "native", constructor: globalThis.WebSocket };
              }
              return {
                type: "unsupported",
                error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
                workaround: "Provide a WebSocket implementation via the transport option."
              };
            }
            return {
              type: "unsupported",
              error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
              workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'
            };
          }
        }
        return {
          type: "unsupported",
          error: "Unknown JavaScript runtime without WebSocket support.",
          workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
        };
      }
      static getWebSocketConstructor() {
        const env = this.detectEnvironment();
        if (env.constructor) {
          return env.constructor;
        }
        let errorMessage = env.error || "WebSocket not supported in this environment.";
        if (env.workaround) {
          errorMessage += `

Suggested solution: ${env.workaround}`;
        }
        throw new Error(errorMessage);
      }
      static createWebSocket(url, protocols) {
        const WS = this.getWebSocketConstructor();
        return new WS(url, protocols);
      }
      static isWebSocketSupported() {
        try {
          const env = this.detectEnvironment();
          return env.type === "native" || env.type === "ws";
        } catch (_a2) {
          return false;
        }
      }
    };
    websocket_factory_default = WebSocketFactory;
  }
});
var version;
var init_version = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/version.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    version = "2.78.0";
  }
});
var DEFAULT_VERSION;
var VSN;
var DEFAULT_TIMEOUT;
var WS_CLOSE_NORMAL;
var MAX_PUSH_BUFFER_SIZE;
var SOCKET_STATES;
var CHANNEL_STATES;
var CHANNEL_EVENTS;
var TRANSPORTS;
var CONNECTION_STATE;
var init_constants = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/constants.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_version();
    DEFAULT_VERSION = `realtime-js/${version}`;
    VSN = "1.0.0";
    DEFAULT_TIMEOUT = 1e4;
    WS_CLOSE_NORMAL = 1e3;
    MAX_PUSH_BUFFER_SIZE = 100;
    (function(SOCKET_STATES2) {
      SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
      SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
      SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
      SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
    })(SOCKET_STATES || (SOCKET_STATES = {}));
    (function(CHANNEL_STATES2) {
      CHANNEL_STATES2["closed"] = "closed";
      CHANNEL_STATES2["errored"] = "errored";
      CHANNEL_STATES2["joined"] = "joined";
      CHANNEL_STATES2["joining"] = "joining";
      CHANNEL_STATES2["leaving"] = "leaving";
    })(CHANNEL_STATES || (CHANNEL_STATES = {}));
    (function(CHANNEL_EVENTS2) {
      CHANNEL_EVENTS2["close"] = "phx_close";
      CHANNEL_EVENTS2["error"] = "phx_error";
      CHANNEL_EVENTS2["join"] = "phx_join";
      CHANNEL_EVENTS2["reply"] = "phx_reply";
      CHANNEL_EVENTS2["leave"] = "phx_leave";
      CHANNEL_EVENTS2["access_token"] = "access_token";
    })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
    (function(TRANSPORTS2) {
      TRANSPORTS2["websocket"] = "websocket";
    })(TRANSPORTS || (TRANSPORTS = {}));
    (function(CONNECTION_STATE2) {
      CONNECTION_STATE2["Connecting"] = "connecting";
      CONNECTION_STATE2["Open"] = "open";
      CONNECTION_STATE2["Closing"] = "closing";
      CONNECTION_STATE2["Closed"] = "closed";
    })(CONNECTION_STATE || (CONNECTION_STATE = {}));
  }
});
var Serializer;
var init_serializer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/serializer.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Serializer = class {
      static {
        __name(this, "Serializer");
      }
      static {
        __name2(this, "Serializer");
      }
      constructor() {
        this.HEADER_LENGTH = 1;
      }
      decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
          return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
          return callback(JSON.parse(rawPayload));
        }
        return callback({});
      }
      _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
      }
      _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic, event, payload: data };
      }
    };
  }
});
var Timer;
var init_timer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/timer.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    Timer = class {
      static {
        __name(this, "Timer");
      }
      static {
        __name2(this, "Timer");
      }
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
      }
      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
        this.timer = void 0;
      }
      // Cancels any previous scheduleTimeout and schedules callback
      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
  }
});
var PostgresTypes;
var convertChangeData;
var convertColumn;
var convertCell;
var noop;
var toBoolean;
var toNumber;
var toJson;
var toArray;
var toTimestampString;
var httpEndpointURL;
var init_transformers = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    (function(PostgresTypes2) {
      PostgresTypes2["abstime"] = "abstime";
      PostgresTypes2["bool"] = "bool";
      PostgresTypes2["date"] = "date";
      PostgresTypes2["daterange"] = "daterange";
      PostgresTypes2["float4"] = "float4";
      PostgresTypes2["float8"] = "float8";
      PostgresTypes2["int2"] = "int2";
      PostgresTypes2["int4"] = "int4";
      PostgresTypes2["int4range"] = "int4range";
      PostgresTypes2["int8"] = "int8";
      PostgresTypes2["int8range"] = "int8range";
      PostgresTypes2["json"] = "json";
      PostgresTypes2["jsonb"] = "jsonb";
      PostgresTypes2["money"] = "money";
      PostgresTypes2["numeric"] = "numeric";
      PostgresTypes2["oid"] = "oid";
      PostgresTypes2["reltime"] = "reltime";
      PostgresTypes2["text"] = "text";
      PostgresTypes2["time"] = "time";
      PostgresTypes2["timestamp"] = "timestamp";
      PostgresTypes2["timestamptz"] = "timestamptz";
      PostgresTypes2["timetz"] = "timetz";
      PostgresTypes2["tsrange"] = "tsrange";
      PostgresTypes2["tstzrange"] = "tstzrange";
    })(PostgresTypes || (PostgresTypes = {}));
    convertChangeData = /* @__PURE__ */ __name2((columns, record, options = {}) => {
      var _a2;
      const skipTypes = (_a2 = options.skipTypes) !== null && _a2 !== void 0 ? _a2 : [];
      if (!record) {
        return {};
      }
      return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
      }, {});
    }, "convertChangeData");
    convertColumn = /* @__PURE__ */ __name2((columnName, columns, record, skipTypes) => {
      const column = columns.find((x) => x.name === columnName);
      const colType = column === null || column === void 0 ? void 0 : column.type;
      const value = record[columnName];
      if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
      }
      return noop(value);
    }, "convertColumn");
    convertCell = /* @__PURE__ */ __name2((type, value) => {
      if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
      }
      switch (type) {
        case PostgresTypes.bool:
          return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
          return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
          return toJson(value);
        case PostgresTypes.timestamp:
          return toTimestampString(value);
        // Format to be consistent with PostgREST
        case PostgresTypes.abstime:
        // To allow users to cast it based on Timezone
        case PostgresTypes.date:
        // To allow users to cast it based on Timezone
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        // To allow users to cast it based on Timezone
        case PostgresTypes.text:
        case PostgresTypes.time:
        // To allow users to cast it based on Timezone
        case PostgresTypes.timestamptz:
        // To allow users to cast it based on Timezone
        case PostgresTypes.timetz:
        // To allow users to cast it based on Timezone
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
          return noop(value);
        default:
          return noop(value);
      }
    }, "convertCell");
    noop = /* @__PURE__ */ __name2((value) => {
      return value;
    }, "noop");
    toBoolean = /* @__PURE__ */ __name2((value) => {
      switch (value) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return value;
      }
    }, "toBoolean");
    toNumber = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
          return parsedValue;
        }
      }
      return value;
    }, "toNumber");
    toJson = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.log(`JSON parse error: ${error}`);
          return value;
        }
      }
      return value;
    }, "toJson");
    toArray = /* @__PURE__ */ __name2((value, type) => {
      if (typeof value !== "string") {
        return value;
      }
      const lastIdx = value.length - 1;
      const closeBrace = value[lastIdx];
      const openBrace = value[0];
      if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        try {
          arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
          arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val) => convertCell(type, val));
      }
      return value;
    }, "toArray");
    toTimestampString = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return value.replace(" ", "T");
      }
      return value;
    }, "toTimestampString");
    httpEndpointURL = /* @__PURE__ */ __name2((socketUrl) => {
      const wsUrl = new URL(socketUrl);
      wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
      wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
      if (wsUrl.pathname === "" || wsUrl.pathname === "/") {
        wsUrl.pathname = "/api/broadcast";
      } else {
        wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
      }
      return wsUrl.href;
    }, "httpEndpointURL");
  }
});
var Push;
var init_push = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/push.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_constants();
    Push = class {
      static {
        __name(this, "Push");
      }
      static {
        __name2(this, "Push");
      }
      /**
       * Initializes the Push
       *
       * @param channel The Channel
       * @param event The event, for example `"phx_join"`
       * @param payload The payload, for example `{user_id: 123}`
       * @param timeout The push timeout in milliseconds
       */
      constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = void 0;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
      }
      resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }
      send() {
        if (this._hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref,
          join_ref: this.channel._joinRef()
        });
      }
      updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
      }
      receive(status, callback) {
        var _a2;
        if (this._hasReceived(status)) {
          callback((_a2 = this.receivedResp) === null || _a2 === void 0 ? void 0 : _a2.response);
        }
        this.recHooks.push({ status, callback });
        return this;
      }
      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = /* @__PURE__ */ __name2((payload) => {
          this._cancelRefEvent();
          this._cancelTimeout();
          this.receivedResp = payload;
          this._matchReceive(payload);
        }, "callback");
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      trigger(status, response) {
        if (this.refEvent)
          this.channel._trigger(this.refEvent, { status, response });
      }
      destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
      }
      _cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = void 0;
      }
      _matchReceive({ status, response }) {
        this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
      }
      _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    };
  }
});
var REALTIME_PRESENCE_LISTEN_EVENTS;
var RealtimePresence;
var init_RealtimePresence = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
      REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
      REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
      REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
    })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
    RealtimePresence = class _RealtimePresence {
      static {
        __name(this, "_RealtimePresence");
      }
      static {
        __name2(this, "RealtimePresence");
      }
      /**
       * Initializes the Presence.
       *
       * @param channel - The RealtimeChannel
       * @param opts - The options,
       *        for example `{events: {state: 'state', diff: 'diff'}}`
       */
      constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.enabled = false;
        this.caller = {
          onJoin: /* @__PURE__ */ __name2(() => {
          }, "onJoin"),
          onLeave: /* @__PURE__ */ __name2(() => {
          }, "onLeave"),
          onSync: /* @__PURE__ */ __name2(() => {
          }, "onSync")
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState) => {
          const { onJoin, onLeave, onSync } = this.caller;
          this.joinRef = this.channel._joinRef();
          this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
          this.pendingDiffs.forEach((diff) => {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          });
          this.pendingDiffs = [];
          onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
          const { onJoin, onLeave, onSync } = this.caller;
          if (this.inPendingSyncState()) {
            this.pendingDiffs.push(diff);
          } else {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            onSync();
          }
        });
        this.onJoin((key, currentPresences, newPresences) => {
          this.channel._trigger("presence", {
            event: "join",
            key,
            currentPresences,
            newPresences
          });
        });
        this.onLeave((key, currentPresences, leftPresences) => {
          this.channel._trigger("presence", {
            event: "leave",
            key,
            currentPresences,
            leftPresences
          });
        });
        this.onSync(() => {
          this.channel._trigger("presence", { event: "sync" });
        });
      }
      /**
       * Used to sync the list of presences on the server with the
       * client's state.
       *
       * An optional `onJoin` and `onLeave` callback can be provided to
       * react to changes in the client's local presences across
       * disconnects and reconnects with the server.
       *
       * @internal
       */
      static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences) => {
          if (!transformedState[key]) {
            leaves[key] = presences;
          }
        });
        this.map(transformedState, (key, newPresences) => {
          const currentPresences = state[key];
          if (currentPresences) {
            const newPresenceRefs = newPresences.map((m) => m.presence_ref);
            const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
            const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
            const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
            if (joinedPresences.length > 0) {
              joins[key] = joinedPresences;
            }
            if (leftPresences.length > 0) {
              leaves[key] = leftPresences;
            }
          } else {
            joins[key] = newPresences;
          }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
      }
      /**
       * Used to sync a diff of presence join and leave events from the
       * server, as they happen.
       *
       * Like `syncState`, `syncDiff` accepts optional `onJoin` and
       * `onLeave` callbacks to react to a user joining or leaving from a
       * device.
       *
       * @internal
       */
      static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
          joins: this.transformState(diff.joins),
          leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
          onJoin = /* @__PURE__ */ __name2(() => {
          }, "onJoin");
        }
        if (!onLeave) {
          onLeave = /* @__PURE__ */ __name2(() => {
          }, "onLeave");
        }
        this.map(joins, (key, newPresences) => {
          var _a2;
          const currentPresences = (_a2 = state[key]) !== null && _a2 !== void 0 ? _a2 : [];
          state[key] = this.cloneDeep(newPresences);
          if (currentPresences.length > 0) {
            const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
            const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
            state[key].unshift(...curPresences);
          }
          onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences) => {
          let currentPresences = state[key];
          if (!currentPresences)
            return;
          const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
          currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
          state[key] = currentPresences;
          onLeave(key, currentPresences, leftPresences);
          if (currentPresences.length === 0)
            delete state[key];
        });
        return state;
      }
      /** @internal */
      static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
      }
      /**
       * Remove 'metas' key
       * Change 'phx_ref' to 'presence_ref'
       * Remove 'phx_ref' and 'phx_ref_prev'
       *
       * @example
       * // returns {
       *  abc123: [
       *    { presence_ref: '2', user_id: 1 },
       *    { presence_ref: '3', user_id: 2 }
       *  ]
       * }
       * RealtimePresence.transformState({
       *  abc123: {
       *    metas: [
       *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
       *      { phx_ref: '3', user_id: 2 }
       *    ]
       *  }
       * })
       *
       * @internal
       */
      static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key) => {
          const presences = state[key];
          if ("metas" in presences) {
            newState[key] = presences.metas.map((presence) => {
              presence["presence_ref"] = presence["phx_ref"];
              delete presence["phx_ref"];
              delete presence["phx_ref_prev"];
              return presence;
            });
          } else {
            newState[key] = presences;
          }
          return newState;
        }, {});
      }
      /** @internal */
      static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
      /** @internal */
      onJoin(callback) {
        this.caller.onJoin = callback;
      }
      /** @internal */
      onLeave(callback) {
        this.caller.onLeave = callback;
      }
      /** @internal */
      onSync(callback) {
        this.caller.onSync = callback;
      }
      /** @internal */
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
      }
    };
  }
});
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
var REALTIME_LISTEN_TYPES;
var REALTIME_SUBSCRIBE_STATES;
var RealtimeChannel;
var init_RealtimeChannel = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_constants();
    init_push();
    init_timer();
    init_RealtimePresence();
    init_transformers();
    init_transformers();
    (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
    })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
    (function(REALTIME_LISTEN_TYPES2) {
      REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
      REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
      REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
      REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
    })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
    (function(REALTIME_SUBSCRIBE_STATES2) {
      REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
      REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
      REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
      REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
    })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
    RealtimeChannel = class _RealtimeChannel {
      static {
        __name(this, "_RealtimeChannel");
      }
      static {
        __name2(this, "RealtimeChannel");
      }
      constructor(topic, params = { config: {} }, socket) {
        var _a2, _b;
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.subTopic = topic.replace(/^realtime:/i, "");
        this.params.config = Object.assign({
          broadcast: { ack: false, self: false },
          presence: { key: "", enabled: false },
          private: false
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach((pushEvent) => pushEvent.send());
          this.pushBuffer = [];
        });
        this._onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket._remove(this);
        });
        this._onError((reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this._isJoining()) {
            return;
          }
          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("error", (reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
          this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
        this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint);
        this.private = this.params.config.private || false;
        if (!this.private && ((_b = (_a2 = this.params.config) === null || _a2 === void 0 ? void 0 : _a2.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) {
          throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
        }
      }
      /** Subscribe registers your client with the server */
      subscribe(callback, timeout = this.timeout) {
        var _a2, _b, _c;
        if (!this.socket.isConnected()) {
          this.socket.connect();
        }
        if (this.state == CHANNEL_STATES.closed) {
          const { config: { broadcast, presence, private: isPrivate } } = this.params;
          const postgres_changes = (_b = (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
          const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
          const accessTokenPayload = {};
          const config = {
            broadcast,
            presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
            postgres_changes,
            private: isPrivate
          };
          if (this.socket.accessTokenValue) {
            accessTokenPayload.access_token = this.socket.accessTokenValue;
          }
          this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
          this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
          this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
          this.joinedOnce = true;
          this._rejoin(timeout);
          this.joinPush.receive("ok", async ({ postgres_changes: postgres_changes2 }) => {
            var _a3;
            this.socket.setAuth();
            if (postgres_changes2 === void 0) {
              callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
              return;
            } else {
              const clientPostgresBindings = this.bindings.postgres_changes;
              const bindingsLen = (_a3 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a3 !== void 0 ? _a3 : 0;
              const newPostgresBindings = [];
              for (let i = 0; i < bindingsLen; i++) {
                const clientPostgresBinding = clientPostgresBindings[i];
                const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                const serverPostgresFilter = postgres_changes2 && postgres_changes2[i];
                if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                  newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                } else {
                  this.unsubscribe();
                  this.state = CHANNEL_STATES.errored;
                  callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
                  return;
                }
              }
              this.bindings.postgres_changes = newPostgresBindings;
              callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
              return;
            }
          }).receive("error", (error) => {
            this.state = CHANNEL_STATES.errored;
            callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
            return;
          }).receive("timeout", () => {
            callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
            return;
          });
        }
        return this;
      }
      presenceState() {
        return this.presence.state;
      }
      async track(payload, opts = {}) {
        return await this.send({
          type: "presence",
          event: "track",
          payload
        }, opts.timeout || this.timeout);
      }
      async untrack(opts = {}) {
        return await this.send({
          type: "presence",
          event: "untrack"
        }, opts);
      }
      on(type, filter, callback) {
        if (this.state === CHANNEL_STATES.joined && type === REALTIME_LISTEN_TYPES.PRESENCE) {
          this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
          this.unsubscribe().then(() => this.subscribe());
        }
        return this._on(type, filter, callback);
      }
      /**
       * Sends a broadcast message explicitly via REST API.
       *
       * This method always uses the REST API endpoint regardless of WebSocket connection state.
       * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
       *
       * @param event The name of the broadcast event
       * @param payload Payload to be sent (required)
       * @param opts Options including timeout
       * @returns Promise resolving to object with success status, and error details if failed
       */
      async httpSend(event, payload, opts = {}) {
        var _a2;
        const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
        if (payload === void 0 || payload === null) {
          return Promise.reject("Payload is required for httpSend()");
        }
        const options = {
          method: "POST",
          headers: {
            Authorization: authorization,
            apikey: this.socket.apiKey ? this.socket.apiKey : "",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: [
              {
                topic: this.subTopic,
                event,
                payload,
                private: this.private
              }
            ]
          })
        };
        const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a2 = opts.timeout) !== null && _a2 !== void 0 ? _a2 : this.timeout);
        if (response.status === 202) {
          return { success: true };
        }
        let errorMessage = response.statusText;
        try {
          const errorBody = await response.json();
          errorMessage = errorBody.error || errorBody.message || errorMessage;
        } catch (_b) {
        }
        return Promise.reject(new Error(errorMessage));
      }
      /**
       * Sends a message into the channel.
       *
       * @param args Arguments to send to channel
       * @param args.type The type of event to send
       * @param args.event The name of the event being sent
       * @param args.payload Payload to be sent
       * @param opts Options to be used during the send process
       */
      async send(args, opts = {}) {
        var _a2, _b;
        if (!this._canPush() && args.type === "broadcast") {
          console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
          const { event, payload: endpoint_payload } = args;
          const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
          const options = {
            method: "POST",
            headers: {
              Authorization: authorization,
              apikey: this.socket.apiKey ? this.socket.apiKey : "",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              messages: [
                {
                  topic: this.subTopic,
                  event,
                  payload: endpoint_payload,
                  private: this.private
                }
              ]
            })
          };
          try {
            const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a2 = opts.timeout) !== null && _a2 !== void 0 ? _a2 : this.timeout);
            await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
            return response.ok ? "ok" : "error";
          } catch (error) {
            if (error.name === "AbortError") {
              return "timed out";
            } else {
              return "error";
            }
          }
        } else {
          return new Promise((resolve) => {
            var _a3, _b2, _c;
            const push = this._push(args.type, args, opts.timeout || this.timeout);
            if (args.type === "broadcast" && !((_c = (_b2 = (_a3 = this.params) === null || _a3 === void 0 ? void 0 : _a3.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
              resolve("ok");
            }
            push.receive("ok", () => resolve("ok"));
            push.receive("error", () => resolve("error"));
            push.receive("timeout", () => resolve("timed out"));
          });
        }
      }
      updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
      }
      /**
       * Leaves the channel.
       *
       * Unsubscribes from server events, and instructs channel to terminate on server.
       * Triggers onClose() hooks.
       *
       * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
       * channel.unsubscribe().receive("ok", () => alert("left!") )
       */
      unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = /* @__PURE__ */ __name2(() => {
          this.socket.log("channel", `leave ${this.topic}`);
          this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        }, "onClose");
        this.joinPush.destroy();
        let leavePush = null;
        return new Promise((resolve) => {
          leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
          leavePush.receive("ok", () => {
            onClose();
            resolve("ok");
          }).receive("timeout", () => {
            onClose();
            resolve("timed out");
          }).receive("error", () => {
            resolve("error");
          });
          leavePush.send();
          if (!this._canPush()) {
            leavePush.trigger("ok", {});
          }
        }).finally(() => {
          leavePush === null || leavePush === void 0 ? void 0 : leavePush.destroy();
        });
      }
      /**
       * Teardown the channel.
       *
       * Destroys and stops related timers.
       */
      teardown() {
        this.pushBuffer.forEach((push) => push.destroy());
        this.pushBuffer = [];
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        this.state = CHANNEL_STATES.closed;
        this.bindings = {};
      }
      /** @internal */
      async _fetchWithTimeout(url, options, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
        clearTimeout(id);
        return response;
      }
      /** @internal */
      _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
          pushEvent.send();
        } else {
          this._addToPushBuffer(pushEvent);
        }
        return pushEvent;
      }
      /** @internal */
      _addToPushBuffer(pushEvent) {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
        if (this.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
          const removedPush = this.pushBuffer.shift();
          if (removedPush) {
            removedPush.destroy();
            this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
          }
        }
      }
      /**
       * Overridable message hook
       *
       * Receives all events for specialized message handling before dispatching to the channel callbacks.
       * Must return the payload, modified or unmodified.
       *
       * @internal
       */
      _onMessage(_event, payload, _ref) {
        return payload;
      }
      /** @internal */
      _isMember(topic) {
        return this.topic === topic;
      }
      /** @internal */
      _joinRef() {
        return this.joinPush.ref;
      }
      /** @internal */
      _trigger(type, payload, ref) {
        var _a2, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = CHANNEL_EVENTS;
        const events = [close, error, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
          return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if (["insert", "update", "delete"].includes(typeLower)) {
          (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.filter((bind) => {
            var _a3, _b2, _c;
            return ((_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
          }).map((bind) => bind.callback(handledPayload, ref));
        } else {
          (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
            var _a3, _b2, _c, _d, _e, _f;
            if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
              if ("id" in bind) {
                const bindId = bind.id;
                const bindEvent = (_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event;
                return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
              } else {
                const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
              }
            } else {
              return bind.type.toLocaleLowerCase() === typeLower;
            }
          }).map((bind) => {
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
              const postgresChanges = handledPayload.data;
              const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
              const enrichedPayload = {
                schema,
                table,
                commit_timestamp,
                eventType: type2,
                new: {},
                old: {},
                errors
              };
              handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
          });
        }
      }
      /** @internal */
      _isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
      /** @internal */
      _isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
      /** @internal */
      _isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
      /** @internal */
      _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
      /** @internal */
      _replyEventName(ref) {
        return `chan_reply_${ref}`;
      }
      /** @internal */
      _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
          type: typeLower,
          filter,
          callback
        };
        if (this.bindings[typeLower]) {
          this.bindings[typeLower].push(binding);
        } else {
          this.bindings[typeLower] = [binding];
        }
        return this;
      }
      /** @internal */
      _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        if (this.bindings[typeLower]) {
          this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
            var _a2;
            return !(((_a2 = bind.type) === null || _a2 === void 0 ? void 0 : _a2.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
          });
        }
        return this;
      }
      /** @internal */
      static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        for (const k in obj1) {
          if (obj1[k] !== obj2[k]) {
            return false;
          }
        }
        return true;
      }
      /** @internal */
      _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
          this._rejoin();
        }
      }
      /**
       * Registers a callback that will be executed when the channel closes.
       *
       * @internal
       */
      _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
      }
      /**
       * Registers a callback that will be executed when the channel encounteres an error.
       *
       * @internal
       */
      _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
      }
      /**
       * Returns `true` if the socket is connected and the channel has been joined.
       *
       * @internal
       */
      _canPush() {
        return this.socket.isConnected() && this._isJoined();
      }
      /** @internal */
      _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
          return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
      /** @internal */
      _getPayloadRecords(payload) {
        const records = {
          new: {},
          old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
          records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
          records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
      }
    };
  }
});
var noop2;
var CONNECTION_TIMEOUTS;
var RECONNECT_INTERVALS;
var DEFAULT_RECONNECT_FALLBACK;
var WORKER_SCRIPT;
var RealtimeClient;
var init_RealtimeClient = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_websocket_factory();
    init_constants();
    init_serializer();
    init_timer();
    init_transformers();
    init_RealtimeChannel();
    noop2 = /* @__PURE__ */ __name2(() => {
    }, "noop");
    CONNECTION_TIMEOUTS = {
      HEARTBEAT_INTERVAL: 25e3,
      RECONNECT_DELAY: 10,
      HEARTBEAT_TIMEOUT_FALLBACK: 100
    };
    RECONNECT_INTERVALS = [1e3, 2e3, 5e3, 1e4];
    DEFAULT_RECONNECT_FALLBACK = 1e4;
    WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
    RealtimeClient = class {
      static {
        __name(this, "RealtimeClient");
      }
      static {
        __name2(this, "RealtimeClient");
      }
      /**
       * Initializes the Socket.
       *
       * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
       * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
       * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
       * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
       * @param options.params The optional params to pass when connecting.
       * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
       * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
       * @param options.heartbeatCallback The optional function to handle heartbeat status.
       * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
       * @param options.logLevel Sets the log level for Realtime
       * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
       * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
       * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
       * @param options.worker Use Web Worker to set a side flow. Defaults to false.
       * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
       */
      constructor(endPoint, options) {
        var _a2;
        this.accessTokenValue = null;
        this.apiKey = null;
        this.channels = new Array();
        this.endPoint = "";
        this.httpEndpoint = "";
        this.headers = {};
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.transport = null;
        this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
        this.heartbeatTimer = void 0;
        this.pendingHeartbeatRef = null;
        this.heartbeatCallback = noop2;
        this.ref = 0;
        this.reconnectTimer = null;
        this.logger = noop2;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this.accessToken = null;
        this._connectionState = "disconnected";
        this._wasManualDisconnect = false;
        this._authPromise = null;
        this._resolveFetch = (customFetch) => {
          let _fetch;
          if (customFetch) {
            _fetch = customFetch;
          } else if (typeof fetch === "undefined") {
            _fetch = /* @__PURE__ */ __name2((...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)).catch((error) => {
              throw new Error(`Failed to load @supabase/node-fetch: ${error.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
            }), "_fetch");
          } else {
            _fetch = fetch;
          }
          return (...args) => _fetch(...args);
        };
        if (!((_a2 = options === null || options === void 0 ? void 0 : options.params) === null || _a2 === void 0 ? void 0 : _a2.apikey)) {
          throw new Error("API key is required to connect to Realtime");
        }
        this.apiKey = options.params.apikey;
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        this.httpEndpoint = httpEndpointURL(endPoint);
        this._initializeOptions(options);
        this._setupReconnectionTimer();
        this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
      }
      /**
       * Connects the socket, unless already connected.
       */
      connect() {
        if (this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected()) {
          return;
        }
        this._setConnectionState("connecting");
        this._setAuthSafely("connect");
        if (this.transport) {
          this.conn = new this.transport(this.endpointURL());
        } else {
          try {
            this.conn = websocket_factory_default.createWebSocket(this.endpointURL());
          } catch (error) {
            this._setConnectionState("disconnected");
            const errorMessage = error.message;
            if (errorMessage.includes("Node.js")) {
              throw new Error(`${errorMessage}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
            }
            throw new Error(`WebSocket not available: ${errorMessage}`);
          }
        }
        this._setupConnectionHandlers();
      }
      /**
       * Returns the URL of the websocket.
       * @returns string The URL of the websocket.
       */
      endpointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
      }
      /**
       * Disconnects the socket.
       *
       * @param code A numeric status code to send on disconnect.
       * @param reason A custom reason for the disconnect.
       */
      disconnect(code, reason) {
        if (this.isDisconnecting()) {
          return;
        }
        this._setConnectionState("disconnecting", true);
        if (this.conn) {
          const fallbackTimer = setTimeout(() => {
            this._setConnectionState("disconnected");
          }, 100);
          this.conn.onclose = () => {
            clearTimeout(fallbackTimer);
            this._setConnectionState("disconnected");
          };
          if (code) {
            this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
          } else {
            this.conn.close();
          }
          this._teardownConnection();
        } else {
          this._setConnectionState("disconnected");
        }
      }
      /**
       * Returns all created channels
       */
      getChannels() {
        return this.channels;
      }
      /**
       * Unsubscribes and removes a single channel
       * @param channel A RealtimeChannel instance
       */
      async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (this.channels.length === 0) {
          this.disconnect();
        }
        return status;
      }
      /**
       * Unsubscribes and removes all channels
       */
      async removeAllChannels() {
        const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
        this.channels = [];
        this.disconnect();
        return values_1;
      }
      /**
       * Logs the message.
       *
       * For customized logging, `this.logger` can be overridden.
       */
      log(kind, msg, data) {
        this.logger(kind, msg, data);
      }
      /**
       * Returns the current state of the socket.
       */
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return CONNECTION_STATE.Connecting;
          case SOCKET_STATES.open:
            return CONNECTION_STATE.Open;
          case SOCKET_STATES.closing:
            return CONNECTION_STATE.Closing;
          default:
            return CONNECTION_STATE.Closed;
        }
      }
      /**
       * Returns `true` is the connection is open.
       */
      isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
      }
      /**
       * Returns `true` if the connection is currently connecting.
       */
      isConnecting() {
        return this._connectionState === "connecting";
      }
      /**
       * Returns `true` if the connection is currently disconnecting.
       */
      isDisconnecting() {
        return this._connectionState === "disconnecting";
      }
      channel(topic, params = { config: {} }) {
        const realtimeTopic = `realtime:${topic}`;
        const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
        if (!exists) {
          const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
          this.channels.push(chan);
          return chan;
        } else {
          return exists;
        }
      }
      /**
       * Push out a message if the socket is connected.
       *
       * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
       */
      push(data) {
        const { topic, event, payload, ref } = data;
        const callback = /* @__PURE__ */ __name2(() => {
          this.encode(data, (result) => {
            var _a2;
            (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send(result);
          });
        }, "callback");
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      }
      /**
       * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
       *
       * If param is null it will use the `accessToken` callback function or the token set on the client.
       *
       * On callback used, it will set the value of the token internal to the client.
       *
       * @param token A JWT string to override the token set on the client.
       */
      async setAuth(token = null) {
        this._authPromise = this._performAuth(token);
        try {
          await this._authPromise;
        } finally {
          this._authPromise = null;
        }
      }
      /**
       * Sends a heartbeat message if the socket is connected.
       */
      async sendHeartbeat() {
        var _a2;
        if (!this.isConnected()) {
          try {
            this.heartbeatCallback("disconnected");
          } catch (e) {
            this.log("error", "error in heartbeat callback", e);
          }
          return;
        }
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          try {
            this.heartbeatCallback("timeout");
          } catch (e) {
            this.log("error", "error in heartbeat callback", e);
          }
          this._wasManualDisconnect = false;
          (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.close(WS_CLOSE_NORMAL, "heartbeat timeout");
          setTimeout(() => {
            var _a3;
            if (!this.isConnected()) {
              (_a3 = this.reconnectTimer) === null || _a3 === void 0 ? void 0 : _a3.scheduleTimeout();
            }
          }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
          return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        try {
          this.heartbeatCallback("sent");
        } catch (e) {
          this.log("error", "error in heartbeat callback", e);
        }
        this._setAuthSafely("heartbeat");
      }
      onHeartbeat(callback) {
        this.heartbeatCallback = callback;
      }
      /**
       * Flushes send buffer
       */
      flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach((callback) => callback());
          this.sendBuffer = [];
        }
      }
      /**
       * Return the next message ref, accounting for overflows
       *
       * @internal
       */
      _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
      /**
       * Unsubscribe from channels with the specified topic.
       *
       * @internal
       */
      _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
          this.log("transport", `leaving duplicate topic "${topic}"`);
          dupChannel.unsubscribe();
        }
      }
      /**
       * Removes a subscription from the socket.
       *
       * @param channel An open subscription.
       *
       * @internal
       */
      _remove(channel) {
        this.channels = this.channels.filter((c) => c.topic !== channel.topic);
      }
      /** @internal */
      _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
          if (msg.topic === "phoenix" && msg.event === "phx_reply") {
            try {
              this.heartbeatCallback(msg.payload.status === "ok" ? "ok" : "error");
            } catch (e) {
              this.log("error", "error in heartbeat callback", e);
            }
          }
          if (msg.ref && msg.ref === this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
          }
          const { topic, event, payload, ref } = msg;
          const refString = ref ? `(${ref})` : "";
          const status = payload.status || "";
          this.log("receive", `${status} ${topic} ${event} ${refString}`.trim(), payload);
          this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
          this._triggerStateCallbacks("message", msg);
        });
      }
      /**
       * Clear specific timer
       * @internal
       */
      _clearTimer(timer) {
        var _a2;
        if (timer === "heartbeat" && this.heartbeatTimer) {
          clearInterval(this.heartbeatTimer);
          this.heartbeatTimer = void 0;
        } else if (timer === "reconnect") {
          (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.reset();
        }
      }
      /**
       * Clear all timers
       * @internal
       */
      _clearAllTimers() {
        this._clearTimer("heartbeat");
        this._clearTimer("reconnect");
      }
      /**
       * Setup connection handlers for WebSocket events
       * @internal
       */
      _setupConnectionHandlers() {
        if (!this.conn)
          return;
        if ("binaryType" in this.conn) {
          ;
          this.conn.binaryType = "arraybuffer";
        }
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error) => this._onConnError(error);
        this.conn.onmessage = (event) => this._onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
      }
      /**
       * Teardown connection and cleanup resources
       * @internal
       */
      _teardownConnection() {
        if (this.conn) {
          this.conn.onopen = null;
          this.conn.onerror = null;
          this.conn.onmessage = null;
          this.conn.onclose = null;
          this.conn = null;
        }
        this._clearAllTimers();
        this.channels.forEach((channel) => channel.teardown());
      }
      /** @internal */
      _onConnOpen() {
        this._setConnectionState("connected");
        this.log("transport", `connected to ${this.endpointURL()}`);
        this.flushSendBuffer();
        this._clearTimer("reconnect");
        if (!this.worker) {
          this._startHeartbeat();
        } else {
          if (!this.workerRef) {
            this._startWorkerHeartbeat();
          }
        }
        this._triggerStateCallbacks("open");
      }
      /** @internal */
      _startHeartbeat() {
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
      }
      /** @internal */
      _startWorkerHeartbeat() {
        if (this.workerUrl) {
          this.log("worker", `starting worker for from ${this.workerUrl}`);
        } else {
          this.log("worker", `starting default worker`);
        }
        const objectUrl = this._workerObjectUrl(this.workerUrl);
        this.workerRef = new Worker(objectUrl);
        this.workerRef.onerror = (error) => {
          this.log("worker", "worker error", error.message);
          this.workerRef.terminate();
        };
        this.workerRef.onmessage = (event) => {
          if (event.data.event === "keepAlive") {
            this.sendHeartbeat();
          }
        };
        this.workerRef.postMessage({
          event: "start",
          interval: this.heartbeatIntervalMs
        });
      }
      /** @internal */
      _onConnClose(event) {
        var _a2;
        this._setConnectionState("disconnected");
        this.log("transport", "close", event);
        this._triggerChanError();
        this._clearTimer("heartbeat");
        if (!this._wasManualDisconnect) {
          (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.scheduleTimeout();
        }
        this._triggerStateCallbacks("close", event);
      }
      /** @internal */
      _onConnError(error) {
        this._setConnectionState("disconnected");
        this.log("transport", `${error}`);
        this._triggerChanError();
        this._triggerStateCallbacks("error", error);
      }
      /** @internal */
      _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
      }
      /** @internal */
      _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        const prefix = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
      }
      _workerObjectUrl(url) {
        let result_url;
        if (url) {
          result_url = url;
        } else {
          const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
          result_url = URL.createObjectURL(blob);
        }
        return result_url;
      }
      /**
       * Set connection state with proper state management
       * @internal
       */
      _setConnectionState(state, manual = false) {
        this._connectionState = state;
        if (state === "connecting") {
          this._wasManualDisconnect = false;
        } else if (state === "disconnecting") {
          this._wasManualDisconnect = manual;
        }
      }
      /**
       * Perform the actual auth operation
       * @internal
       */
      async _performAuth(token = null) {
        let tokenToSend;
        if (token) {
          tokenToSend = token;
        } else if (this.accessToken) {
          tokenToSend = await this.accessToken();
        } else {
          tokenToSend = this.accessTokenValue;
        }
        if (this.accessTokenValue != tokenToSend) {
          this.accessTokenValue = tokenToSend;
          this.channels.forEach((channel) => {
            const payload = {
              access_token: tokenToSend,
              version: DEFAULT_VERSION
            };
            tokenToSend && channel.updateJoinPayload(payload);
            if (channel.joinedOnce && channel._isJoined()) {
              channel._push(CHANNEL_EVENTS.access_token, {
                access_token: tokenToSend
              });
            }
          });
        }
      }
      /**
       * Wait for any in-flight auth operations to complete
       * @internal
       */
      async _waitForAuthIfNeeded() {
        if (this._authPromise) {
          await this._authPromise;
        }
      }
      /**
       * Safely call setAuth with standardized error handling
       * @internal
       */
      _setAuthSafely(context = "general") {
        this.setAuth().catch((e) => {
          this.log("error", `error setting auth in ${context}`, e);
        });
      }
      /**
       * Trigger state change callbacks with proper error handling
       * @internal
       */
      _triggerStateCallbacks(event, data) {
        try {
          this.stateChangeCallbacks[event].forEach((callback) => {
            try {
              callback(data);
            } catch (e) {
              this.log("error", `error in ${event} callback`, e);
            }
          });
        } catch (e) {
          this.log("error", `error triggering ${event} callbacks`, e);
        }
      }
      /**
       * Setup reconnection timer with proper configuration
       * @internal
       */
      _setupReconnectionTimer() {
        this.reconnectTimer = new Timer(async () => {
          setTimeout(async () => {
            await this._waitForAuthIfNeeded();
            if (!this.isConnected()) {
              this.connect();
            }
          }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
        }, this.reconnectAfterMs);
      }
      /**
       * Initialize client options with defaults
       * @internal
       */
      _initializeOptions(options) {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
        this.transport = (_a2 = options === null || options === void 0 ? void 0 : options.transport) !== null && _a2 !== void 0 ? _a2 : null;
        this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : DEFAULT_TIMEOUT;
        this.heartbeatIntervalMs = (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
        this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
        this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
        this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : noop2;
        if (options === null || options === void 0 ? void 0 : options.params)
          this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.logger)
          this.logger = options.logger;
        if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
          this.logLevel = options.logLevel || options.log_level;
          this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
        }
        this.reconnectAfterMs = (_g = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _g !== void 0 ? _g : (tries) => {
          return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
        };
        this.encode = (_h = options === null || options === void 0 ? void 0 : options.encode) !== null && _h !== void 0 ? _h : (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        this.decode = (_j = options === null || options === void 0 ? void 0 : options.decode) !== null && _j !== void 0 ? _j : this.serializer.decode.bind(this.serializer);
        if (this.worker) {
          if (typeof window !== "undefined" && !window.Worker) {
            throw new Error("Web Worker is not supported");
          }
          this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
        }
      }
    };
  }
});
var init_module2 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_RealtimeClient();
    init_RealtimeChannel();
    init_RealtimePresence();
    init_websocket_factory();
  }
});
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
__name(isStorageError, "isStorageError");
var StorageError;
var StorageApiError;
var StorageUnknownError;
var init_errors = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/errors.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    StorageError = class extends Error {
      static {
        __name(this, "StorageError");
      }
      static {
        __name2(this, "StorageError");
      }
      constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
      }
    };
    __name2(isStorageError, "isStorageError");
    StorageApiError = class extends StorageError {
      static {
        __name(this, "StorageApiError");
      }
      static {
        __name2(this, "StorageApiError");
      }
      constructor(message, status, statusCode) {
        super(message);
        this.name = "StorageApiError";
        this.status = status;
        this.statusCode = statusCode;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          statusCode: this.statusCode
        };
      }
    };
    StorageUnknownError = class extends StorageError {
      static {
        __name(this, "StorageUnknownError");
      }
      static {
        __name2(this, "StorageUnknownError");
      }
      constructor(message, originalError) {
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
      }
    };
  }
});
var resolveFetch2;
var resolveResponse;
var recursiveToCamel;
var isPlainObject;
var init_helpers = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/helpers.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    resolveFetch2 = /* @__PURE__ */ __name2((customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = /* @__PURE__ */ __name2((...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)), "_fetch");
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    }, "resolveFetch");
    resolveResponse = /* @__PURE__ */ __name2(() => __awaiter(void 0, void 0, void 0, function* () {
      if (typeof Response === "undefined") {
        return (yield Promise.resolve().then(() => (init_browser(), browser_exports))).Response;
      }
      return Response;
    }), "resolveResponse");
    recursiveToCamel = /* @__PURE__ */ __name2((item) => {
      if (Array.isArray(item)) {
        return item.map((el) => recursiveToCamel(el));
      } else if (typeof item === "function" || item !== Object(item)) {
        return item;
      }
      const result = {};
      Object.entries(item).forEach(([key, value]) => {
        const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
        result[newKey] = recursiveToCamel(value);
      });
      return result;
    }, "recursiveToCamel");
    isPlainObject = /* @__PURE__ */ __name2((value) => {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
    }, "isPlainObject");
  }
});
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError(error, reject, options));
    });
  });
}
__name(_handleRequest, "_handleRequest");
function get(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options, parameters);
  });
}
__name(get, "get");
function post(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options, parameters, body);
  });
}
__name(post, "post");
function put(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options, parameters, body);
  });
}
__name(put, "put");
function head(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "HEAD", url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
  });
}
__name(head, "head");
function remove(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
  });
}
__name(remove, "remove");
var _getErrorMessage;
var handleError;
var _getRequestParams;
var init_fetch = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/fetch.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_errors();
    init_helpers();
    _getErrorMessage = /* @__PURE__ */ __name2((err) => {
      var _a2;
      return err.msg || err.message || err.error_description || (typeof err.error === "string" ? err.error : (_a2 = err.error) === null || _a2 === void 0 ? void 0 : _a2.message) || JSON.stringify(err);
    }, "_getErrorMessage");
    handleError = /* @__PURE__ */ __name2((error, reject, options) => __awaiter(void 0, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
        error.json().then((err) => {
          const status = error.status || 500;
          const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || status + "";
          reject(new StorageApiError(_getErrorMessage(err), status, statusCode));
        }).catch((err) => {
          reject(new StorageUnknownError(_getErrorMessage(err), err));
        });
      } else {
        reject(new StorageUnknownError(_getErrorMessage(error), error));
      }
    }), "handleError");
    _getRequestParams = /* @__PURE__ */ __name2((method, options, parameters, body) => {
      const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
      if (method === "GET" || !body) {
        return params;
      }
      if (isPlainObject(body)) {
        params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
        params.body = JSON.stringify(body);
      } else {
        params.body = body;
      }
      if (options === null || options === void 0 ? void 0 : options.duplex) {
        params.duplex = options.duplex;
      }
      return Object.assign(Object.assign({}, params), parameters);
    }, "_getRequestParams");
    __name2(_handleRequest, "_handleRequest");
    __name2(get, "get");
    __name2(post, "post");
    __name2(put, "put");
    __name2(head, "head");
    __name2(remove, "remove");
  }
});
var StreamDownloadBuilder;
var init_StreamDownloadBuilder = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StreamDownloadBuilder.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_errors();
    StreamDownloadBuilder = class {
      static {
        __name(this, "StreamDownloadBuilder");
      }
      static {
        __name2(this, "StreamDownloadBuilder");
      }
      constructor(downloadFn, shouldThrowOnError) {
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
      }
      then(onfulfilled, onrejected) {
        return this.execute().then(onfulfilled, onrejected);
      }
      execute() {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const result = yield this.downloadFn();
            return {
              data: result.body,
              error: null
            };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});
var _a;
var BlobDownloadBuilder;
var BlobDownloadBuilder_default;
var init_BlobDownloadBuilder = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/BlobDownloadBuilder.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_errors();
    init_StreamDownloadBuilder();
    BlobDownloadBuilder = class {
      static {
        __name(this, "BlobDownloadBuilder");
      }
      static {
        __name2(this, "BlobDownloadBuilder");
      }
      constructor(downloadFn, shouldThrowOnError) {
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
        this[_a] = "BlobDownloadBuilder";
        this.promise = null;
      }
      asStream() {
        return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
      }
      then(onfulfilled, onrejected) {
        return this.getPromise().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.getPromise().catch(onrejected);
      }
      finally(onfinally) {
        return this.getPromise().finally(onfinally);
      }
      getPromise() {
        if (!this.promise) {
          this.promise = this.execute();
        }
        return this.promise;
      }
      execute() {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const result = yield this.downloadFn();
            return {
              data: yield result.blob(),
              error: null
            };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
    _a = Symbol.toStringTag;
    BlobDownloadBuilder_default = BlobDownloadBuilder;
  }
});
var DEFAULT_SEARCH_OPTIONS;
var DEFAULT_FILE_OPTIONS;
var StorageFileApi;
var init_StorageFileApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_errors();
    init_fetch();
    init_helpers();
    init_BlobDownloadBuilder();
    DEFAULT_SEARCH_OPTIONS = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    };
    DEFAULT_FILE_OPTIONS = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: false
    };
    StorageFileApi = class {
      static {
        __name(this, "StorageFileApi");
      }
      static {
        __name2(this, "StorageFileApi");
      }
      constructor(url, headers = {}, bucketId, fetch3) {
        this.shouldThrowOnError = false;
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them.
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
       *
       * @param method HTTP method.
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let body;
            const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
            let headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
            const metadata = options.metadata;
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body = new FormData();
              body.append("cacheControl", options.cacheControl);
              if (metadata) {
                body.append("metadata", this.encodeMetadata(metadata));
              }
              body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body = fileBody;
              body.append("cacheControl", options.cacheControl);
              if (metadata) {
                body.append("metadata", this.encodeMetadata(metadata));
              }
            } else {
              body = fileBody;
              headers["cache-control"] = `max-age=${options.cacheControl}`;
              headers["content-type"] = options.contentType;
              if (metadata) {
                headers["x-metadata"] = this.toBase64(this.encodeMetadata(metadata));
              }
            }
            if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
              headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
            }
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const data = yield (method == "PUT" ? put : post)(this.fetch, `${this.url}/object/${_path}`, body, Object.assign({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
            return {
              data: { path: cleanPath, id: data.Id, fullPath: data.Key },
              error: null
            };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Uploads a file to an existing bucket.
       *
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      upload(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
      }
      /**
       * Upload a file with a token generated from `createSignedUploadUrl`.
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param token The token generated from `createSignedUploadUrl`
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
          const cleanPath = this._removeEmptyFolders(path);
          const _path = this._getFinalPath(cleanPath);
          const url = new URL(this.url + `/object/upload/sign/${_path}`);
          url.searchParams.set("token", token);
          try {
            let body;
            const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
            const headers = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body = new FormData();
              body.append("cacheControl", options.cacheControl);
              body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body = fileBody;
              body.append("cacheControl", options.cacheControl);
            } else {
              body = fileBody;
              headers["cache-control"] = `max-age=${options.cacheControl}`;
              headers["content-type"] = options.contentType;
            }
            const data = yield put(this.fetch, url.toString(), body, { headers });
            return {
              data: { path: cleanPath, fullPath: data.Key },
              error: null
            };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a signed upload URL.
       * Signed upload URLs can be used to upload files to the bucket without further authentication.
       * They are valid for 2 hours.
       * @param path The file path, including the current file name. For example `folder/image.png`.
       * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
       */
      createSignedUploadUrl(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            const headers = Object.assign({}, this.headers);
            if (options === null || options === void 0 ? void 0 : options.upsert) {
              headers["x-upsert"] = "true";
            }
            const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
            const url = new URL(this.url + data.url);
            const token = url.searchParams.get("token");
            if (!token) {
              throw new StorageError("No token returned by API");
            }
            return { data: { signedUrl: url.toString(), path, token }, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Replaces an existing file at the specified path with a new one.
       *
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      update(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
      }
      /**
       * Moves an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
       * @param options The destination options.
       */
      move(fromPath, toPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/move`, {
              bucketId: this.bucketId,
              sourceKey: fromPath,
              destinationKey: toPath,
              destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Copies an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
       * @param options The destination options.
       */
      copy(fromPath, toPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/copy`, {
              bucketId: this.bucketId,
              sourceKey: fromPath,
              destinationKey: toPath,
              destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
            }, { headers: this.headers });
            return { data: { path: data.Key }, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param path The file path, including the current file name. For example `folder/image.png`.
       * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      createSignedUrl(path, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {}), { headers: this.headers });
            const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
            const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
            data = { signedUrl };
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
       * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       */
      createSignedUrls(paths, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
            const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
            return {
              data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
              error: null
            };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
       *
       * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
       * @param options.transform Transform the asset before serving it to the client.
       */
      download(path, options) {
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        const queryString = transformationQuery ? `?${transformationQuery}` : "";
        const _path = this._getFinalPath(path);
        const downloadFn = /* @__PURE__ */ __name2(() => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
          headers: this.headers,
          noResolveJson: true
        }), "downloadFn");
        return new BlobDownloadBuilder_default(downloadFn, this.shouldThrowOnError);
      }
      /**
       * Retrieves the details of an existing file.
       * @param path
       */
      info(path) {
        return __awaiter(this, void 0, void 0, function* () {
          const _path = this._getFinalPath(path);
          try {
            const data = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
              headers: this.headers
            });
            return { data: recursiveToCamel(data), error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Checks the existence of a file.
       * @param path
       */
      exists(path) {
        return __awaiter(this, void 0, void 0, function* () {
          const _path = this._getFinalPath(path);
          try {
            yield head(this.fetch, `${this.url}/object/${_path}`, {
              headers: this.headers
            });
            return { data: true, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error) && error instanceof StorageUnknownError) {
              const originalError = error.originalError;
              if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
                return { data: false, error };
              }
            }
            throw error;
          }
        });
      }
      /**
       * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
       * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
       *
       * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
       * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
        if (downloadQueryParam !== "") {
          _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== "") {
          _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join("&");
        if (queryString !== "") {
          queryString = `?${queryString}`;
        }
        return {
          data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
        };
      }
      /**
       * Deletes files within the same bucket
       *
       * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
       */
      remove(paths) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Get file metadata
       * @param id the file id to retrieve metadata
       */
      // async getMetadata(
      //   id: string
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Update file metadata
       * @param id the file id to update metadata
       * @param meta the new file metadata
       */
      // async updateMetadata(
      //   id: string,
      //   meta: Metadata
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await post(
      //       this.fetch,
      //       `${this.url}/metadata/${id}`,
      //       { ...meta },
      //       { headers: this.headers }
      //     )
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Lists all the files and folders within a path of the bucket.
       * @param path The folder path.
       * @param options Search options including limit (defaults to 100), offset, sortBy, and search
       */
      list(path, options, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
            const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * @experimental this method signature might change in the future
       * @param options search options
       * @param parameters
       */
      listV2(options, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const body = Object.assign({}, options);
            const data = yield post(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, body, { headers: this.headers }, parameters);
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      encodeMetadata(metadata) {
        return JSON.stringify(metadata);
      }
      toBase64(data) {
        if (typeof Buffer !== "undefined") {
          return Buffer.from(data).toString("base64");
        }
        return btoa(data);
      }
      _getFinalPath(path) {
        return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
      }
      _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
      transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
          params.push(`width=${transform.width}`);
        }
        if (transform.height) {
          params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
          params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
          params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
          params.push(`quality=${transform.quality}`);
        }
        return params.join("&");
      }
    };
  }
});
var version2;
var init_version2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/version.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    version2 = "2.78.0";
  }
});
var DEFAULT_HEADERS;
var init_constants2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/constants.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_version2();
    DEFAULT_HEADERS = {
      "X-Client-Info": `storage-js/${version2}`
    };
  }
});
var StorageBucketApi;
var init_StorageBucketApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants2();
    init_errors();
    init_fetch();
    init_helpers();
    StorageBucketApi = class {
      static {
        __name(this, "StorageBucketApi");
      }
      static {
        __name2(this, "StorageBucketApi");
      }
      constructor(url, headers = {}, fetch3, opts) {
        this.shouldThrowOnError = false;
        const baseUrl = new URL(url);
        if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
          const isSupabaseHost = /supabase\.(co|in|red)$/.test(baseUrl.hostname);
          if (isSupabaseHost && !baseUrl.hostname.includes("storage.supabase.")) {
            baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
          }
        }
        this.url = baseUrl.href.replace(/\/$/, "");
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them.
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Retrieves the details of all Storage buckets within an existing project.
       */
      listBuckets(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const queryString = this.listBucketOptionsToQueryString(options);
            const data = yield get(this.fetch, `${this.url}/bucket${queryString}`, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves the details of an existing Storage bucket.
       *
       * @param id The unique identifier of the bucket you would like to retrieve.
       */
      getBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a new Storage bucket
       *
       * @param id A unique identifier for the bucket you are creating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       * @returns newly created bucket id
       * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
       *   - default bucket type is `STANDARD`
       */
      createBucket(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, options = {
          public: false
        }) {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket`, {
              id,
              name: id,
              type: options.type,
              public: options.public,
              file_size_limit: options.fileSizeLimit,
              allowed_mime_types: options.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Updates a Storage bucket
       *
       * @param id A unique identifier for the bucket you are updating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       */
      updateBucket(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
              id,
              name: id,
              public: options.public,
              file_size_limit: options.fileSizeLimit,
              allowed_mime_types: options.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Removes all objects inside a single bucket.
       *
       * @param id The unique identifier of the bucket you would like to empty.
       */
      emptyBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
       * You must first `empty()` the bucket.
       *
       * @param id The unique identifier of the bucket you would like to delete.
       */
      deleteBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      listBucketOptionsToQueryString(options) {
        const params = {};
        if (options) {
          if ("limit" in options) {
            params.limit = String(options.limit);
          }
          if ("offset" in options) {
            params.offset = String(options.offset);
          }
          if (options.search) {
            params.search = options.search;
          }
          if (options.sortColumn) {
            params.sortColumn = options.sortColumn;
          }
          if (options.sortOrder) {
            params.sortOrder = options.sortOrder;
          }
        }
        return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
      }
    };
  }
});
var StorageAnalyticsApi;
var init_StorageAnalyticsApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageAnalyticsApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants2();
    init_errors();
    init_fetch();
    init_helpers();
    StorageAnalyticsApi = class {
      static {
        __name(this, "StorageAnalyticsApi");
      }
      static {
        __name2(this, "StorageAnalyticsApi");
      }
      /**
       * Creates a new StorageAnalyticsApi instance
       * @param url - The base URL for the storage API
       * @param headers - HTTP headers to include in requests
       * @param fetch - Optional custom fetch implementation
       */
      constructor(url, headers = {}, fetch3) {
        this.shouldThrowOnError = false;
        this.url = url.replace(/\/$/, "");
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them in the response
       * When enabled, failed operations will throw instead of returning { data: null, error }
       *
       * @returns This instance for method chaining
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Creates a new analytics bucket using Iceberg tables
       * Analytics buckets are optimized for analytical queries and data processing
       *
       * @param name A unique name for the bucket you are creating
       * @returns Promise with newly created bucket name or error
       *
       * @example
       * ```typescript
       * const { data, error } = await storage.analytics.createBucket('analytics-data')
       * if (error) {
       *   console.error('Failed to create analytics bucket:', error.message)
       * } else {
       *   console.log('Created bucket:', data.name)
       * }
       * ```
       */
      createBucket(name) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket`, { name }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves the details of all Analytics Storage buckets within an existing project
       * Only returns buckets of type 'ANALYTICS'
       *
       * @param options Query parameters for listing buckets
       * @param options.limit Maximum number of buckets to return
       * @param options.offset Number of buckets to skip
       * @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
       * @param options.sortOrder Sort order ('asc' or 'desc')
       * @param options.search Search term to filter bucket names
       * @returns Promise with list of analytics buckets or error
       *
       * @example
       * ```typescript
       * const { data, error } = await storage.analytics.listBuckets({
       *   limit: 10,
       *   offset: 0,
       *   sortColumn: 'created_at',
       *   sortOrder: 'desc',
       *   search: 'analytics'
       * })
       * if (data) {
       *   console.log('Found analytics buckets:', data.length)
       *   data.forEach(bucket => console.log(`- ${bucket.name}`))
       * }
       * ```
       */
      listBuckets(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const queryParams = new URLSearchParams();
            if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0)
              queryParams.set("limit", options.limit.toString());
            if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0)
              queryParams.set("offset", options.offset.toString());
            if (options === null || options === void 0 ? void 0 : options.sortColumn)
              queryParams.set("sortColumn", options.sortColumn);
            if (options === null || options === void 0 ? void 0 : options.sortOrder)
              queryParams.set("sortOrder", options.sortOrder);
            if (options === null || options === void 0 ? void 0 : options.search)
              queryParams.set("search", options.search);
            const queryString = queryParams.toString();
            const url = queryString ? `${this.url}/bucket?${queryString}` : `${this.url}/bucket`;
            const data = yield get(this.fetch, url, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes an existing analytics bucket
       * A bucket can't be deleted with existing objects inside it
       * You must first empty the bucket before deletion
       *
       * @param bucketId The unique identifier of the bucket you would like to delete
       * @returns Promise with success message or error
       *
       * @example
       * ```typescript
       * const { data, error } = await analyticsApi.deleteBucket('old-analytics-bucket')
       * if (error) {
       *   console.error('Failed to delete bucket:', error.message)
       * } else {
       *   console.log('Bucket deleted successfully:', data.message)
       * }
       * ```
       */
      deleteBucket(bucketId) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/bucket/${bucketId}`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});
var DEFAULT_HEADERS2;
var init_constants3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/constants.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_version2();
    DEFAULT_HEADERS2 = {
      "X-Client-Info": `storage-js/${version2}`,
      "Content-Type": "application/json"
    };
  }
});
function isStorageVectorsError(error) {
  return typeof error === "object" && error !== null && "__isStorageVectorsError" in error;
}
__name(isStorageVectorsError, "isStorageVectorsError");
var StorageVectorsError;
var StorageVectorsApiError;
var StorageVectorsUnknownError;
var StorageVectorsErrorCode;
var init_errors2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/errors.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    StorageVectorsError = class extends Error {
      static {
        __name(this, "StorageVectorsError");
      }
      static {
        __name2(this, "StorageVectorsError");
      }
      constructor(message) {
        super(message);
        this.__isStorageVectorsError = true;
        this.name = "StorageVectorsError";
      }
    };
    __name2(isStorageVectorsError, "isStorageVectorsError");
    StorageVectorsApiError = class extends StorageVectorsError {
      static {
        __name(this, "StorageVectorsApiError");
      }
      static {
        __name2(this, "StorageVectorsApiError");
      }
      constructor(message, status, statusCode) {
        super(message);
        this.name = "StorageVectorsApiError";
        this.status = status;
        this.statusCode = statusCode;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          statusCode: this.statusCode
        };
      }
    };
    StorageVectorsUnknownError = class extends StorageVectorsError {
      static {
        __name(this, "StorageVectorsUnknownError");
      }
      static {
        __name2(this, "StorageVectorsUnknownError");
      }
      constructor(message, originalError) {
        super(message);
        this.name = "StorageVectorsUnknownError";
        this.originalError = originalError;
      }
    };
    (function(StorageVectorsErrorCode2) {
      StorageVectorsErrorCode2["InternalError"] = "InternalError";
      StorageVectorsErrorCode2["S3VectorConflictException"] = "S3VectorConflictException";
      StorageVectorsErrorCode2["S3VectorNotFoundException"] = "S3VectorNotFoundException";
      StorageVectorsErrorCode2["S3VectorBucketNotEmpty"] = "S3VectorBucketNotEmpty";
      StorageVectorsErrorCode2["S3VectorMaxBucketsExceeded"] = "S3VectorMaxBucketsExceeded";
      StorageVectorsErrorCode2["S3VectorMaxIndexesExceeded"] = "S3VectorMaxIndexesExceeded";
    })(StorageVectorsErrorCode || (StorageVectorsErrorCode = {}));
  }
});
var resolveFetch3;
var isPlainObject2;
var init_helpers2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/helpers.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    resolveFetch3 = /* @__PURE__ */ __name2((customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = /* @__PURE__ */ __name2((...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)), "_fetch");
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    }, "resolveFetch");
    isPlainObject2 = /* @__PURE__ */ __name2((value) => {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
    }, "isPlainObject");
  }
});
function _handleRequest2(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams2(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        const contentType = result.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return {};
        }
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError2(error, reject, options));
    });
  });
}
__name(_handleRequest2, "_handleRequest2");
function post2(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "POST", url, options, parameters, body);
  });
}
__name(post2, "post2");
var _getErrorMessage2;
var handleError2;
var _getRequestParams2;
var init_fetch2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/fetch.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_errors2();
    init_helpers2();
    _getErrorMessage2 = /* @__PURE__ */ __name2((err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err), "_getErrorMessage");
    handleError2 = /* @__PURE__ */ __name2((error, reject, options) => __awaiter(void 0, void 0, void 0, function* () {
      const isResponseLike = error && typeof error === "object" && "status" in error && "ok" in error && typeof error.status === "number";
      if (isResponseLike && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
        const status = error.status || 500;
        const responseError = error;
        if (typeof responseError.json === "function") {
          responseError.json().then((err) => {
            const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
            reject(new StorageVectorsApiError(_getErrorMessage2(err), status, statusCode));
          }).catch(() => {
            const statusCode = status + "";
            const message = responseError.statusText || `HTTP ${status} error`;
            reject(new StorageVectorsApiError(message, status, statusCode));
          });
        } else {
          const statusCode = status + "";
          const message = responseError.statusText || `HTTP ${status} error`;
          reject(new StorageVectorsApiError(message, status, statusCode));
        }
      } else {
        reject(new StorageVectorsUnknownError(_getErrorMessage2(error), error));
      }
    }), "handleError");
    _getRequestParams2 = /* @__PURE__ */ __name2((method, options, parameters, body) => {
      const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
      if (method === "GET" || !body) {
        return params;
      }
      if (isPlainObject2(body)) {
        params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
        params.body = JSON.stringify(body);
      } else {
        params.body = body;
      }
      return Object.assign(Object.assign({}, params), parameters);
    }, "_getRequestParams");
    __name2(_handleRequest2, "_handleRequest");
    __name2(post2, "post");
  }
});
var VectorIndexApi;
var init_VectorIndexApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorIndexApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants3();
    init_errors2();
    init_fetch2();
    init_helpers2();
    VectorIndexApi = class {
      static {
        __name(this, "VectorIndexApi");
      }
      static {
        __name2(this, "VectorIndexApi");
      }
      constructor(url, headers = {}, fetch3) {
        this.shouldThrowOnError = false;
        this.url = url.replace(/\/$/, "");
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
        this.fetch = resolveFetch3(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them in the response
       * When enabled, failed operations will throw instead of returning { data: null, error }
       *
       * @returns This instance for method chaining
       * @example
       * ```typescript
       * const client = new VectorIndexApi(url, headers)
       * client.throwOnError()
       * const { data } = await client.createIndex(options) // throws on error
       * ```
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Creates a new vector index within a bucket
       * Defines the schema for vectors including dimensionality, distance metric, and metadata config
       *
       * @param options - Index configuration
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Unique name for the index within the bucket
       * @param options.dataType - Data type for vector components (currently only 'float32')
       * @param options.dimension - Dimensionality of vectors (e.g., 384, 768, 1536)
       * @param options.distanceMetric - Similarity metric ('cosine', 'euclidean', 'dotproduct')
       * @param options.metadataConfiguration - Optional config for non-filterable metadata keys
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorConflictException` if index already exists (HTTP 409)
       * - `S3VectorMaxIndexesExceeded` if quota exceeded (HTTP 400)
       * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.createIndex({
       *   vectorBucketName: 'embeddings-prod',
       *   indexName: 'documents-openai-small',
       *   dataType: 'float32',
       *   dimension: 1536,
       *   distanceMetric: 'cosine',
       *   metadataConfiguration: {
       *     nonFilterableMetadataKeys: ['raw_text', 'internal_id']
       *   }
       * })
       * ```
       */
      createIndex(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/CreateIndex`, options, {
              headers: this.headers
            });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves metadata for a specific vector index
       * Returns index configuration including dimension, distance metric, and metadata settings
       *
       * @param vectorBucketName - Name of the parent vector bucket
       * @param indexName - Name of the index to retrieve
       * @returns Promise with index metadata or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.getIndex('embeddings-prod', 'documents-openai-small')
       * if (data) {
       *   console.log('Index dimension:', data.index.dimension)
       *   console.log('Distance metric:', data.index.distanceMetric)
       * }
       * ```
       */
      getIndex(vectorBucketName, indexName) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/GetIndex`, { vectorBucketName, indexName }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Lists vector indexes within a bucket with optional filtering and pagination
       * Supports prefix-based filtering and paginated results
       *
       * @param options - Listing options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.prefix - Filter indexes by name prefix
       * @param options.maxResults - Maximum results per page (default: 100)
       * @param options.nextToken - Pagination token from previous response
       * @returns Promise with list of indexes and pagination token
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // List all indexes in a bucket
       * const { data, error } = await client.listIndexes({
       *   vectorBucketName: 'embeddings-prod',
       *   prefix: 'documents-'
       * })
       * if (data) {
       *   console.log('Found indexes:', data.indexes.map(i => i.indexName))
       *   // Fetch next page if available
       *   if (data.nextToken) {
       *     const next = await client.listIndexes({
       *       vectorBucketName: 'embeddings-prod',
       *       nextToken: data.nextToken
       *     })
       *   }
       * }
       * ```
       */
      listIndexes(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/ListIndexes`, options, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes a vector index and all its data
       * This operation removes the index schema and all vectors stored in the index
       *
       * @param vectorBucketName - Name of the parent vector bucket
       * @param indexName - Name of the index to delete
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // Delete an index and all its vectors
       * const { error } = await client.deleteIndex('embeddings-prod', 'old-index')
       * if (!error) {
       *   console.log('Index deleted successfully')
       * }
       * ```
       */
      deleteIndex(vectorBucketName, indexName) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName, indexName }, { headers: this.headers });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});
var VectorDataApi;
var init_VectorDataApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorDataApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants3();
    init_errors2();
    init_fetch2();
    init_helpers2();
    VectorDataApi = class {
      static {
        __name(this, "VectorDataApi");
      }
      static {
        __name2(this, "VectorDataApi");
      }
      constructor(url, headers = {}, fetch3) {
        this.shouldThrowOnError = false;
        this.url = url.replace(/\/$/, "");
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
        this.fetch = resolveFetch3(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them in the response
       * When enabled, failed operations will throw instead of returning { data: null, error }
       *
       * @returns This instance for method chaining
       * @example
       * ```typescript
       * const client = new VectorDataApi(url, headers)
       * client.throwOnError()
       * const { data } = await client.putVectors(options) // throws on error
       * ```
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Inserts or updates vectors in batch (upsert operation)
       * Accepts 1-500 vectors per request. Larger batches should be split
       *
       * @param options - Vector insertion options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Name of the target index
       * @param options.vectors - Array of vectors to insert/update (1-500 items)
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorConflictException` if duplicate key conflict occurs (HTTP 409)
       * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.putVectors({
       *   vectorBucketName: 'embeddings-prod',
       *   indexName: 'documents-openai-small',
       *   vectors: [
       *     {
       *       key: 'doc-1',
       *       data: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
       *       metadata: { title: 'Introduction', page: 1 }
       *     },
       *     {
       *       key: 'doc-2',
       *       data: { float32: [0.4, 0.5, 0.6, ...] },
       *       metadata: { title: 'Conclusion', page: 42 }
       *     }
       *   ]
       * })
       * ```
       */
      putVectors(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            if (options.vectors.length < 1 || options.vectors.length > 500) {
              throw new Error("Vector batch size must be between 1 and 500 items");
            }
            const data = yield post2(this.fetch, `${this.url}/PutVectors`, options, {
              headers: this.headers
            });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves vectors by their keys in batch
       * Optionally includes vector data and/or metadata in response
       * Additional permissions required when returning data or metadata
       *
       * @param options - Vector retrieval options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Name of the index
       * @param options.keys - Array of vector keys to retrieve
       * @param options.returnData - Whether to include vector embeddings (requires permission)
       * @param options.returnMetadata - Whether to include metadata (requires permission)
       * @returns Promise with array of vectors or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.getVectors({
       *   vectorBucketName: 'embeddings-prod',
       *   indexName: 'documents-openai-small',
       *   keys: ['doc-1', 'doc-2', 'doc-3'],
       *   returnData: false,     // Don't return embeddings
       *   returnMetadata: true   // Return metadata only
       * })
       * if (data) {
       *   data.vectors.forEach(v => console.log(v.key, v.metadata))
       * }
       * ```
       */
      getVectors(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/GetVectors`, options, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Lists/scans vectors in an index with pagination
       * Supports parallel scanning via segment configuration for high-throughput scenarios
       * Additional permissions required when returning data or metadata
       *
       * @param options - Vector listing options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Name of the index
       * @param options.maxResults - Maximum results per page (default: 500, max: 1000)
       * @param options.nextToken - Pagination token from previous response
       * @param options.returnData - Whether to include vector embeddings (requires permission)
       * @param options.returnMetadata - Whether to include metadata (requires permission)
       * @param options.segmentCount - Total parallel segments (1-16) for distributed scanning
       * @param options.segmentIndex - Zero-based segment index (0 to segmentCount-1)
       * @returns Promise with array of vectors, pagination token, or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // Simple pagination
       * let nextToken: string | undefined
       * do {
       *   const { data, error } = await client.listVectors({
       *     vectorBucketName: 'embeddings-prod',
       *     indexName: 'documents-openai-small',
       *     maxResults: 500,
       *     nextToken,
       *     returnMetadata: true
       *   })
       *   if (error) break
       *   console.log('Batch:', data.vectors.length)
       *   nextToken = data.nextToken
       * } while (nextToken)
       *
       * // Parallel scanning (4 concurrent workers)
       * const workers = [0, 1, 2, 3].map(async (segmentIndex) => {
       *   const { data } = await client.listVectors({
       *     vectorBucketName: 'embeddings-prod',
       *     indexName: 'documents-openai-small',
       *     segmentCount: 4,
       *     segmentIndex,
       *     returnMetadata: true
       *   })
       *   return data?.vectors || []
       * })
       * const results = await Promise.all(workers)
       * ```
       */
      listVectors(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            if (options.segmentCount !== void 0) {
              if (options.segmentCount < 1 || options.segmentCount > 16) {
                throw new Error("segmentCount must be between 1 and 16");
              }
              if (options.segmentIndex !== void 0) {
                if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) {
                  throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
                }
              }
            }
            const data = yield post2(this.fetch, `${this.url}/ListVectors`, options, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Queries for similar vectors using approximate nearest neighbor (ANN) search
       * Returns top-K most similar vectors based on the configured distance metric
       * Supports optional metadata filtering (requires GetVectors permission)
       *
       * @param options - Query options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Name of the index
       * @param options.queryVector - Query embedding to find similar vectors
       * @param options.topK - Number of nearest neighbors to return (default: 10)
       * @param options.filter - Optional JSON filter for metadata (requires GetVectors permission)
       * @param options.returnDistance - Whether to include similarity distances
       * @param options.returnMetadata - Whether to include metadata (requires GetVectors permission)
       * @returns Promise with array of similar vectors ordered by distance
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // Semantic search with filtering
       * const { data, error } = await client.queryVectors({
       *   vectorBucketName: 'embeddings-prod',
       *   indexName: 'documents-openai-small',
       *   queryVector: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
       *   topK: 5,
       *   filter: {
       *     category: 'technical',
       *     published: true
       *   },
       *   returnDistance: true,
       *   returnMetadata: true
       * })
       * if (data) {
       *   data.matches.forEach(match => {
       *     console.log(`${match.key}: distance=${match.distance}`)
       *     console.log('Metadata:', match.metadata)
       *   })
       * }
       * ```
       */
      queryVectors(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/QueryVectors`, options, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes vectors by their keys in batch
       * Accepts 1-500 keys per request
       *
       * @param options - Vector deletion options
       * @param options.vectorBucketName - Name of the parent vector bucket
       * @param options.indexName - Name of the index
       * @param options.keys - Array of vector keys to delete (1-500 items)
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { error } = await client.deleteVectors({
       *   vectorBucketName: 'embeddings-prod',
       *   indexName: 'documents-openai-small',
       *   keys: ['doc-1', 'doc-2', 'doc-3']
       * })
       * if (!error) {
       *   console.log('Vectors deleted successfully')
       * }
       * ```
       */
      deleteVectors(options) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            if (options.keys.length < 1 || options.keys.length > 500) {
              throw new Error("Keys batch size must be between 1 and 500 items");
            }
            const data = yield post2(this.fetch, `${this.url}/DeleteVectors`, options, {
              headers: this.headers
            });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});
var VectorBucketApi;
var init_VectorBucketApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorBucketApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants3();
    init_errors2();
    init_fetch2();
    init_helpers2();
    VectorBucketApi = class {
      static {
        __name(this, "VectorBucketApi");
      }
      static {
        __name2(this, "VectorBucketApi");
      }
      /**
       * Creates a new VectorBucketApi instance
       * @param url - The base URL for the storage vectors API
       * @param headers - HTTP headers to include in requests
       * @param fetch - Optional custom fetch implementation
       */
      constructor(url, headers = {}, fetch3) {
        this.shouldThrowOnError = false;
        this.url = url.replace(/\/$/, "");
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
        this.fetch = resolveFetch3(fetch3);
      }
      /**
       * Enable throwing errors instead of returning them in the response
       * When enabled, failed operations will throw instead of returning { data: null, error }
       *
       * @returns This instance for method chaining
       * @example
       * ```typescript
       * const client = new VectorBucketApi(url, headers)
       * client.throwOnError()
       * const { data } = await client.createBucket('my-bucket') // throws on error
       * ```
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Creates a new vector bucket
       * Vector buckets are containers for vector indexes and their data
       *
       * @param vectorBucketName - Unique name for the vector bucket
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorConflictException` if bucket already exists (HTTP 409)
       * - `S3VectorMaxBucketsExceeded` if quota exceeded (HTTP 400)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.createBucket('embeddings-prod')
       * if (error) {
       *   console.error('Failed to create bucket:', error.message)
       * }
       * ```
       */
      createBucket(vectorBucketName) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: this.headers });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves metadata for a specific vector bucket
       * Returns bucket configuration including encryption settings and creation time
       *
       * @param vectorBucketName - Name of the vector bucket to retrieve
       * @returns Promise with bucket metadata or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * const { data, error } = await client.getBucket('embeddings-prod')
       * if (data) {
       *   console.log('Bucket created at:', new Date(data.vectorBucket.creationTime! * 1000))
       * }
       * ```
       */
      getBucket(vectorBucketName) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName }, { headers: this.headers });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Lists vector buckets with optional filtering and pagination
       * Supports prefix-based filtering and paginated results
       *
       * @param options - Listing options
       * @param options.prefix - Filter buckets by name prefix
       * @param options.maxResults - Maximum results per page (default: 100)
       * @param options.nextToken - Pagination token from previous response
       * @returns Promise with list of buckets and pagination token
       *
       * @throws {StorageVectorsApiError} With code:
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // List all buckets with prefix 'prod-'
       * const { data, error } = await client.listBuckets({ prefix: 'prod-' })
       * if (data) {
       *   console.log('Found buckets:', data.buckets.length)
       *   // Fetch next page if available
       *   if (data.nextToken) {
       *     const next = await client.listBuckets({ nextToken: data.nextToken })
       *   }
       * }
       * ```
       */
      listBuckets() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
          try {
            const data = yield post2(this.fetch, `${this.url}/ListVectorBuckets`, options, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes a vector bucket
       * Bucket must be empty before deletion (all indexes must be removed first)
       *
       * @param vectorBucketName - Name of the vector bucket to delete
       * @returns Promise with empty response on success or error
       *
       * @throws {StorageVectorsApiError} With code:
       * - `S3VectorBucketNotEmpty` if bucket contains indexes (HTTP 400)
       * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
       * - `InternalError` for server errors (HTTP 500)
       *
       * @example
       * ```typescript
       * // Delete all indexes first, then delete bucket
       * const { error } = await client.deleteBucket('old-bucket')
       * if (error?.statusCode === 'S3VectorBucketNotEmpty') {
       *   console.error('Must delete all indexes first')
       * }
       * ```
       */
      deleteBucket(vectorBucketName) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const data = yield post2(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: this.headers });
            return { data: data || {}, error: null };
          } catch (error) {
            if (this.shouldThrowOnError) {
              throw error;
            }
            if (isStorageVectorsError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});
var StorageVectorsClient;
var VectorBucketScope;
var VectorIndexScope;
var init_StorageVectorsClient = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/StorageVectorsClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_VectorIndexApi();
    init_VectorDataApi();
    init_VectorBucketApi();
    StorageVectorsClient = class extends VectorBucketApi {
      static {
        __name(this, "StorageVectorsClient");
      }
      static {
        __name2(this, "StorageVectorsClient");
      }
      constructor(url, options = {}) {
        super(url, options.headers || {}, options.fetch);
      }
      /**
       * Access operations for a specific vector bucket
       * Returns a scoped client for index and vector operations within the bucket
       *
       * @param vectorBucketName - Name of the vector bucket
       * @returns Bucket-scoped client with index and vector operations
       *
       * @example
       * ```typescript
       * const bucket = client.bucket('embeddings-prod')
       *
       * // Create an index in this bucket
       * await bucket.createIndex({
       *   indexName: 'documents-openai',
       *   dataType: 'float32',
       *   dimension: 1536,
       *   distanceMetric: 'cosine'
       * })
       *
       * // List indexes in this bucket
       * const { data } = await bucket.listIndexes()
       * ```
       */
      from(vectorBucketName) {
        return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
      }
    };
    VectorBucketScope = class extends VectorIndexApi {
      static {
        __name(this, "VectorBucketScope");
      }
      static {
        __name2(this, "VectorBucketScope");
      }
      constructor(url, headers, vectorBucketName, fetch3) {
        super(url, headers, fetch3);
        this.vectorBucketName = vectorBucketName;
      }
      /**
       * Creates a new vector index in this bucket
       * Convenience method that automatically includes the bucket name
       *
       * @param options - Index configuration (vectorBucketName is automatically set)
       * @returns Promise with empty response on success or error
       *
       * @example
       * ```typescript
       * const bucket = client.bucket('embeddings-prod')
       * await bucket.createIndex({
       *   indexName: 'documents-openai',
       *   dataType: 'float32',
       *   dimension: 1536,
       *   distanceMetric: 'cosine',
       *   metadataConfiguration: {
       *     nonFilterableMetadataKeys: ['raw_text']
       *   }
       * })
       * ```
       */
      createIndex(options) {
        const _super = Object.create(null, {
          createIndex: { get: /* @__PURE__ */ __name2(() => super.createIndex, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.createIndex.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName }));
        });
      }
      /**
       * Lists indexes in this bucket
       * Convenience method that automatically includes the bucket name
       *
       * @param options - Listing options (vectorBucketName is automatically set)
       * @returns Promise with list of indexes or error
       *
       * @example
       * ```typescript
       * const bucket = client.bucket('embeddings-prod')
       * const { data } = await bucket.listIndexes({ prefix: 'documents-' })
       * ```
       */
      listIndexes() {
        const _super = Object.create(null, {
          listIndexes: { get: /* @__PURE__ */ __name2(() => super.listIndexes, "get") }
        });
        return __awaiter(this, arguments, void 0, function* (options = {}) {
          return _super.listIndexes.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName }));
        });
      }
      /**
       * Retrieves metadata for a specific index in this bucket
       * Convenience method that automatically includes the bucket name
       *
       * @param indexName - Name of the index to retrieve
       * @returns Promise with index metadata or error
       *
       * @example
       * ```typescript
       * const bucket = client.bucket('embeddings-prod')
       * const { data } = await bucket.getIndex('documents-openai')
       * console.log('Dimension:', data?.index.dimension)
       * ```
       */
      getIndex(indexName) {
        const _super = Object.create(null, {
          getIndex: { get: /* @__PURE__ */ __name2(() => super.getIndex, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.getIndex.call(this, this.vectorBucketName, indexName);
        });
      }
      /**
       * Deletes an index from this bucket
       * Convenience method that automatically includes the bucket name
       *
       * @param indexName - Name of the index to delete
       * @returns Promise with empty response on success or error
       *
       * @example
       * ```typescript
       * const bucket = client.bucket('embeddings-prod')
       * await bucket.deleteIndex('old-index')
       * ```
       */
      deleteIndex(indexName) {
        const _super = Object.create(null, {
          deleteIndex: { get: /* @__PURE__ */ __name2(() => super.deleteIndex, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.deleteIndex.call(this, this.vectorBucketName, indexName);
        });
      }
      /**
       * Access operations for a specific index within this bucket
       * Returns a scoped client for vector data operations
       *
       * @param indexName - Name of the index
       * @returns Index-scoped client with vector data operations
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       *
       * // Insert vectors
       * await index.putVectors({
       *   vectors: [
       *     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
       *   ]
       * })
       *
       * // Query similar vectors
       * const { data } = await index.queryVectors({
       *   queryVector: { float32: [...] },
       *   topK: 5
       * })
       * ```
       */
      index(indexName) {
        return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
      }
    };
    VectorIndexScope = class extends VectorDataApi {
      static {
        __name(this, "VectorIndexScope");
      }
      static {
        __name2(this, "VectorIndexScope");
      }
      constructor(url, headers, vectorBucketName, indexName, fetch3) {
        super(url, headers, fetch3);
        this.vectorBucketName = vectorBucketName;
        this.indexName = indexName;
      }
      /**
       * Inserts or updates vectors in this index
       * Convenience method that automatically includes bucket and index names
       *
       * @param options - Vector insertion options (bucket and index names automatically set)
       * @returns Promise with empty response on success or error
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       * await index.putVectors({
       *   vectors: [
       *     {
       *       key: 'doc-1',
       *       data: { float32: [0.1, 0.2, ...] },
       *       metadata: { title: 'Introduction', page: 1 }
       *     }
       *   ]
       * })
       * ```
       */
      putVectors(options) {
        const _super = Object.create(null, {
          putVectors: { get: /* @__PURE__ */ __name2(() => super.putVectors, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.putVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        });
      }
      /**
       * Retrieves vectors by keys from this index
       * Convenience method that automatically includes bucket and index names
       *
       * @param options - Vector retrieval options (bucket and index names automatically set)
       * @returns Promise with array of vectors or error
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       * const { data } = await index.getVectors({
       *   keys: ['doc-1', 'doc-2'],
       *   returnMetadata: true
       * })
       * ```
       */
      getVectors(options) {
        const _super = Object.create(null, {
          getVectors: { get: /* @__PURE__ */ __name2(() => super.getVectors, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.getVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        });
      }
      /**
       * Lists vectors in this index with pagination
       * Convenience method that automatically includes bucket and index names
       *
       * @param options - Listing options (bucket and index names automatically set)
       * @returns Promise with array of vectors and pagination token
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       * const { data } = await index.listVectors({
       *   maxResults: 500,
       *   returnMetadata: true
       * })
       * ```
       */
      listVectors() {
        const _super = Object.create(null, {
          listVectors: { get: /* @__PURE__ */ __name2(() => super.listVectors, "get") }
        });
        return __awaiter(this, arguments, void 0, function* (options = {}) {
          return _super.listVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        });
      }
      /**
       * Queries for similar vectors in this index
       * Convenience method that automatically includes bucket and index names
       *
       * @param options - Query options (bucket and index names automatically set)
       * @returns Promise with array of similar vectors ordered by distance
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       * const { data } = await index.queryVectors({
       *   queryVector: { float32: [0.1, 0.2, ...] },
       *   topK: 5,
       *   filter: { category: 'technical' },
       *   returnDistance: true,
       *   returnMetadata: true
       * })
       * ```
       */
      queryVectors(options) {
        const _super = Object.create(null, {
          queryVectors: { get: /* @__PURE__ */ __name2(() => super.queryVectors, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.queryVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        });
      }
      /**
       * Deletes vectors by keys from this index
       * Convenience method that automatically includes bucket and index names
       *
       * @param options - Deletion options (bucket and index names automatically set)
       * @returns Promise with empty response on success or error
       *
       * @example
       * ```typescript
       * const index = client.bucket('embeddings-prod').index('documents-openai')
       * await index.deleteVectors({
       *   keys: ['doc-1', 'doc-2', 'doc-3']
       * })
       * ```
       */
      deleteVectors(options) {
        const _super = Object.create(null, {
          deleteVectors: { get: /* @__PURE__ */ __name2(() => super.deleteVectors, "get") }
        });
        return __awaiter(this, void 0, void 0, function* () {
          return _super.deleteVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        });
      }
    };
  }
});
var init_vectors = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/vectors/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_StorageVectorsClient();
  }
});
var StorageClient;
var init_StorageClient = __esm({
  "node_modules/@supabase/storage-js/dist/module/StorageClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_StorageFileApi();
    init_StorageBucketApi();
    init_StorageAnalyticsApi();
    init_vectors();
    StorageClient = class extends StorageBucketApi {
      static {
        __name(this, "StorageClient");
      }
      static {
        __name2(this, "StorageClient");
      }
      constructor(url, headers = {}, fetch3, opts) {
        super(url, headers, fetch3, opts);
      }
      /**
       * Perform file operation in a bucket.
       *
       * @param id The bucket id to operate on.
       */
      from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
      }
      /**
       * Access vector storage operations.
       *
       * @returns A StorageVectorsClient instance configured with the current storage settings.
       */
      get vectors() {
        return new StorageVectorsClient(this.url + "/vector", {
          headers: this.headers,
          fetch: this.fetch
        });
      }
      /**
       * Access analytics storage operations using Iceberg tables.
       *
       * @returns A StorageAnalyticsApi instance configured with the current storage settings.
       * @example
       * ```typescript
       * const client = createClient(url, key)
       * const analytics = client.storage.analytics
       *
       * // Create an analytics bucket
       * await analytics.createBucket('my-analytics-bucket')
       *
       * // List all analytics buckets
       * const { data: buckets } = await analytics.listBuckets()
       *
       * // Delete an analytics bucket
       * await analytics.deleteBucket('old-analytics-bucket')
       * ```
       */
      get analytics() {
        return new StorageAnalyticsApi(this.url + "/iceberg", this.headers, this.fetch);
      }
    };
  }
});
var init_types2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/types.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
  }
});
var init_module3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_StorageClient();
    init_types2();
    init_errors();
    init_vectors();
  }
});
var version3;
var init_version3 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/version.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    version3 = "2.78.0";
  }
});
var JS_ENV;
var DEFAULT_HEADERS3;
var DEFAULT_GLOBAL_OPTIONS;
var DEFAULT_DB_OPTIONS;
var DEFAULT_AUTH_OPTIONS;
var DEFAULT_REALTIME_OPTIONS;
var init_constants4 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/constants.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_version3();
    JS_ENV = "";
    if (typeof Deno !== "undefined") {
      JS_ENV = "deno";
    } else if (typeof document !== "undefined") {
      JS_ENV = "web";
    } else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      JS_ENV = "react-native";
    } else {
      JS_ENV = "node";
    }
    DEFAULT_HEADERS3 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version3}` };
    DEFAULT_GLOBAL_OPTIONS = {
      headers: DEFAULT_HEADERS3
    };
    DEFAULT_DB_OPTIONS = {
      schema: "public"
    };
    DEFAULT_AUTH_OPTIONS = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "implicit"
    };
    DEFAULT_REALTIME_OPTIONS = {};
  }
});
var resolveFetch4;
var resolveHeadersConstructor;
var fetchWithAuth;
var init_fetch3 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/fetch.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_browser();
    resolveFetch4 = /* @__PURE__ */ __name2((customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = browser_default;
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    }, "resolveFetch");
    resolveHeadersConstructor = /* @__PURE__ */ __name2(() => {
      if (typeof Headers === "undefined") {
        return Headers2;
      }
      return Headers;
    }, "resolveHeadersConstructor");
    fetchWithAuth = /* @__PURE__ */ __name2((supabaseKey, getAccessToken, customFetch) => {
      const fetch3 = resolveFetch4(customFetch);
      const HeadersConstructor = resolveHeadersConstructor();
      return async (input, init) => {
        var _a2;
        const accessToken = (_a2 = await getAccessToken()) !== null && _a2 !== void 0 ? _a2 : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has("apikey")) {
          headers.set("apikey", supabaseKey);
        }
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return fetch3(input, Object.assign(Object.assign({}, init), { headers }));
      };
    }, "fetchWithAuth");
  }
});
function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}
__name(ensureTrailingSlash, "ensureTrailingSlash");
function applySettingDefaults(options, defaults) {
  var _a2, _b;
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  const result = {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions), { headers: Object.assign(Object.assign({}, (_a2 = DEFAULT_GLOBAL_OPTIONS2 === null || DEFAULT_GLOBAL_OPTIONS2 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS2.headers) !== null && _a2 !== void 0 ? _a2 : {}), (_b = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _b !== void 0 ? _b : {}) }),
    accessToken: /* @__PURE__ */ __name2(async () => "", "accessToken")
  };
  if (options.accessToken) {
    result.accessToken = options.accessToken;
  } else {
    delete result.accessToken;
  }
  return result;
}
__name(applySettingDefaults, "applySettingDefaults");
function validateSupabaseUrl(supabaseUrl) {
  const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
  if (!trimmedUrl) {
    throw new Error("supabaseUrl is required.");
  }
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  }
  try {
    return new URL(ensureTrailingSlash(trimmedUrl));
  } catch (_a2) {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
__name(validateSupabaseUrl, "validateSupabaseUrl");
var init_helpers3 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/helpers.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(ensureTrailingSlash, "ensureTrailingSlash");
    __name2(applySettingDefaults, "applySettingDefaults");
    __name2(validateSupabaseUrl, "validateSupabaseUrl");
  }
});
var version4;
var init_version4 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/version.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    version4 = "2.78.0";
  }
});
var AUTO_REFRESH_TICK_DURATION_MS;
var AUTO_REFRESH_TICK_THRESHOLD;
var EXPIRY_MARGIN_MS;
var GOTRUE_URL;
var STORAGE_KEY;
var DEFAULT_HEADERS4;
var API_VERSION_HEADER_NAME;
var API_VERSIONS;
var BASE64URL_REGEX;
var JWKS_TTL;
var init_constants5 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/constants.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_version4();
    AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
    AUTO_REFRESH_TICK_THRESHOLD = 3;
    EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
    GOTRUE_URL = "http://localhost:9999";
    STORAGE_KEY = "supabase.auth.token";
    DEFAULT_HEADERS4 = { "X-Client-Info": `gotrue-js/${version4}` };
    API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
    API_VERSIONS = {
      "2024-01-01": {
        timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
        name: "2024-01-01"
      }
    };
    BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
    JWKS_TTL = 10 * 60 * 1e3;
  }
});
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}
__name(isAuthError, "isAuthError");
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}
__name(isAuthApiError, "isAuthApiError");
function isAuthSessionMissingError(error) {
  return isAuthError(error) && error.name === "AuthSessionMissingError";
}
__name(isAuthSessionMissingError, "isAuthSessionMissingError");
function isAuthImplicitGrantRedirectError(error) {
  return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
}
__name(isAuthImplicitGrantRedirectError, "isAuthImplicitGrantRedirectError");
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === "AuthRetryableFetchError";
}
__name(isAuthRetryableFetchError, "isAuthRetryableFetchError");
var AuthError;
var AuthApiError;
var AuthUnknownError;
var CustomAuthError;
var AuthSessionMissingError;
var AuthInvalidTokenResponseError;
var AuthInvalidCredentialsError;
var AuthImplicitGrantRedirectError;
var AuthPKCEGrantCodeExchangeError;
var AuthRetryableFetchError;
var AuthWeakPasswordError;
var AuthInvalidJwtError;
var init_errors3 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/errors.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    AuthError = class extends Error {
      static {
        __name(this, "AuthError");
      }
      static {
        __name2(this, "AuthError");
      }
      constructor(message, status, code) {
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
        this.code = code;
      }
    };
    __name2(isAuthError, "isAuthError");
    AuthApiError = class extends AuthError {
      static {
        __name(this, "AuthApiError");
      }
      static {
        __name2(this, "AuthApiError");
      }
      constructor(message, status, code) {
        super(message, status, code);
        this.name = "AuthApiError";
        this.status = status;
        this.code = code;
      }
    };
    __name2(isAuthApiError, "isAuthApiError");
    AuthUnknownError = class extends AuthError {
      static {
        __name(this, "AuthUnknownError");
      }
      static {
        __name2(this, "AuthUnknownError");
      }
      constructor(message, originalError) {
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
      }
    };
    CustomAuthError = class extends AuthError {
      static {
        __name(this, "CustomAuthError");
      }
      static {
        __name2(this, "CustomAuthError");
      }
      constructor(message, name, status, code) {
        super(message, status, code);
        this.name = name;
        this.status = status;
      }
    };
    AuthSessionMissingError = class extends CustomAuthError {
      static {
        __name(this, "AuthSessionMissingError");
      }
      static {
        __name2(this, "AuthSessionMissingError");
      }
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
      }
    };
    __name2(isAuthSessionMissingError, "isAuthSessionMissingError");
    AuthInvalidTokenResponseError = class extends CustomAuthError {
      static {
        __name(this, "AuthInvalidTokenResponseError");
      }
      static {
        __name2(this, "AuthInvalidTokenResponseError");
      }
      constructor() {
        super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
      }
    };
    AuthInvalidCredentialsError = class extends CustomAuthError {
      static {
        __name(this, "AuthInvalidCredentialsError");
      }
      static {
        __name2(this, "AuthInvalidCredentialsError");
      }
      constructor(message) {
        super(message, "AuthInvalidCredentialsError", 400, void 0);
      }
    };
    AuthImplicitGrantRedirectError = class extends CustomAuthError {
      static {
        __name(this, "AuthImplicitGrantRedirectError");
      }
      static {
        __name2(this, "AuthImplicitGrantRedirectError");
      }
      constructor(message, details = null) {
        super(message, "AuthImplicitGrantRedirectError", 500, void 0);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    __name2(isAuthImplicitGrantRedirectError, "isAuthImplicitGrantRedirectError");
    AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
      static {
        __name(this, "AuthPKCEGrantCodeExchangeError");
      }
      static {
        __name2(this, "AuthPKCEGrantCodeExchangeError");
      }
      constructor(message, details = null) {
        super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthRetryableFetchError = class extends CustomAuthError {
      static {
        __name(this, "AuthRetryableFetchError");
      }
      static {
        __name2(this, "AuthRetryableFetchError");
      }
      constructor(message, status) {
        super(message, "AuthRetryableFetchError", status, void 0);
      }
    };
    __name2(isAuthRetryableFetchError, "isAuthRetryableFetchError");
    AuthWeakPasswordError = class extends CustomAuthError {
      static {
        __name(this, "AuthWeakPasswordError");
      }
      static {
        __name2(this, "AuthWeakPasswordError");
      }
      constructor(message, status, reasons) {
        super(message, "AuthWeakPasswordError", status, "weak_password");
        this.reasons = reasons;
      }
    };
    AuthInvalidJwtError = class extends CustomAuthError {
      static {
        __name(this, "AuthInvalidJwtError");
      }
      static {
        __name2(this, "AuthInvalidJwtError");
      }
      constructor(message) {
        super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
      }
    };
  }
});
function byteToBase64URL(byte, state, emit) {
  if (byte !== null) {
    state.queue = state.queue << 8 | byte;
    state.queuedBits += 8;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  } else if (state.queuedBits > 0) {
    state.queue = state.queue << 6 - state.queuedBits;
    state.queuedBits = 6;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  }
}
__name(byteToBase64URL, "byteToBase64URL");
function byteFromBase64URL(charCode, state, emit) {
  const bits = FROM_BASE64URL[charCode];
  if (bits > -1) {
    state.queue = state.queue << 6 | bits;
    state.queuedBits += 6;
    while (state.queuedBits >= 8) {
      emit(state.queue >> state.queuedBits - 8 & 255);
      state.queuedBits -= 8;
    }
  } else if (bits === -2) {
    return;
  } else {
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
  }
}
__name(byteFromBase64URL, "byteFromBase64URL");
function stringFromBase64URL(str) {
  const conv = [];
  const utf8Emit = /* @__PURE__ */ __name2((codepoint) => {
    conv.push(String.fromCodePoint(codepoint));
  }, "utf8Emit");
  const utf8State = {
    utf8seq: 0,
    codepoint: 0
  };
  const b64State = { queue: 0, queuedBits: 0 };
  const byteEmit = /* @__PURE__ */ __name2((byte) => {
    stringFromUTF8(byte, utf8State, utf8Emit);
  }, "byteEmit");
  for (let i = 0; i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
  }
  return conv.join("");
}
__name(stringFromBase64URL, "stringFromBase64URL");
function codepointToUTF8(codepoint, emit) {
  if (codepoint <= 127) {
    emit(codepoint);
    return;
  } else if (codepoint <= 2047) {
    emit(192 | codepoint >> 6);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 65535) {
    emit(224 | codepoint >> 12);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 1114111) {
    emit(240 | codepoint >> 18);
    emit(128 | codepoint >> 12 & 63);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
__name(codepointToUTF8, "codepointToUTF8");
function stringToUTF8(str, emit) {
  for (let i = 0; i < str.length; i += 1) {
    let codepoint = str.charCodeAt(i);
    if (codepoint > 55295 && codepoint <= 56319) {
      const highSurrogate = (codepoint - 55296) * 1024 & 65535;
      const lowSurrogate = str.charCodeAt(i + 1) - 56320 & 65535;
      codepoint = (lowSurrogate | highSurrogate) + 65536;
      i += 1;
    }
    codepointToUTF8(codepoint, emit);
  }
}
__name(stringToUTF8, "stringToUTF8");
function stringFromUTF8(byte, state, emit) {
  if (state.utf8seq === 0) {
    if (byte <= 127) {
      emit(byte);
      return;
    }
    for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
      if ((byte >> 7 - leadingBit & 1) === 0) {
        state.utf8seq = leadingBit;
        break;
      }
    }
    if (state.utf8seq === 2) {
      state.codepoint = byte & 31;
    } else if (state.utf8seq === 3) {
      state.codepoint = byte & 15;
    } else if (state.utf8seq === 4) {
      state.codepoint = byte & 7;
    } else {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.utf8seq -= 1;
  } else if (state.utf8seq > 0) {
    if (byte <= 127) {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.codepoint = state.codepoint << 6 | byte & 63;
    state.utf8seq -= 1;
    if (state.utf8seq === 0) {
      emit(state.codepoint);
    }
  }
}
__name(stringFromUTF8, "stringFromUTF8");
function base64UrlToUint8Array(str) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onByte = /* @__PURE__ */ __name2((byte) => {
    result.push(byte);
  }, "onByte");
  for (let i = 0; i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), state, onByte);
  }
  return new Uint8Array(result);
}
__name(base64UrlToUint8Array, "base64UrlToUint8Array");
function stringToUint8Array(str) {
  const result = [];
  stringToUTF8(str, (byte) => result.push(byte));
  return new Uint8Array(result);
}
__name(stringToUint8Array, "stringToUint8Array");
function bytesToBase64URL(bytes) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onChar = /* @__PURE__ */ __name2((char) => {
    result.push(char);
  }, "onChar");
  bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
  byteToBase64URL(null, state, onChar);
  return result.join("");
}
__name(bytesToBase64URL, "bytesToBase64URL");
var TO_BASE64URL;
var IGNORE_BASE64URL;
var FROM_BASE64URL;
var init_base64url = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/base64url.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
    IGNORE_BASE64URL = " 	\n\r=".split("");
    FROM_BASE64URL = (() => {
      const charMap = new Array(128);
      for (let i = 0; i < charMap.length; i += 1) {
        charMap[i] = -1;
      }
      for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
        charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
      }
      for (let i = 0; i < TO_BASE64URL.length; i += 1) {
        charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
      }
      return charMap;
    })();
    __name2(byteToBase64URL, "byteToBase64URL");
    __name2(byteFromBase64URL, "byteFromBase64URL");
    __name2(stringFromBase64URL, "stringFromBase64URL");
    __name2(codepointToUTF8, "codepointToUTF8");
    __name2(stringToUTF8, "stringToUTF8");
    __name2(stringFromUTF8, "stringFromUTF8");
    __name2(base64UrlToUint8Array, "base64UrlToUint8Array");
    __name2(stringToUint8Array, "stringToUint8Array");
    __name2(bytesToBase64URL, "bytesToBase64URL");
  }
});
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
__name(expiresAt, "expiresAt");
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
__name(uuid, "uuid");
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key) => {
        result[key] = value;
      });
    } catch (e) {
    }
  }
  url.searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
__name(parseParametersFromURL, "parseParametersFromURL");
function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new AuthInvalidJwtError("Invalid JWT structure");
  }
  for (let i = 0; i < parts.length; i++) {
    if (!BASE64URL_REGEX.test(parts[i])) {
      throw new AuthInvalidJwtError("JWT not in base64url format");
    }
  }
  const data = {
    // using base64url lib
    header: JSON.parse(stringFromBase64URL(parts[0])),
    payload: JSON.parse(stringFromBase64URL(parts[1])),
    signature: base64UrlToUint8Array(parts[2]),
    raw: {
      header: parts[0],
      payload: parts[1]
    }
  };
  return data;
}
__name(decodeJWT, "decodeJWT");
async function sleep(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
__name(sleep, "sleep");
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
__name(retryable, "retryable");
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
__name(dec2hex, "dec2hex");
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i = 0; i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
__name(generatePKCEVerifier, "generatePKCEVerifier");
async function sha256(randomString) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(randomString);
  const hash = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
__name(sha256, "sha256");
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(generatePKCEChallenge, "generatePKCEChallenge");
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
  const codeVerifier = generatePKCEVerifier();
  let storedCodeVerifier = codeVerifier;
  if (isPasswordRecovery) {
    storedCodeVerifier += "/PASSWORD_RECOVERY";
  }
  await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
  const codeChallenge = await generatePKCEChallenge(codeVerifier);
  const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
  return [codeChallenge, codeChallengeMethod];
}
__name(getCodeChallengeAndMethod, "getCodeChallengeAndMethod");
function parseResponseAPIVersion(response) {
  const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
  if (!apiVersion) {
    return null;
  }
  if (!apiVersion.match(API_VERSION_REGEX)) {
    return null;
  }
  try {
    const date = /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
    return date;
  } catch (e) {
    return null;
  }
}
__name(parseResponseAPIVersion, "parseResponseAPIVersion");
function validateExp(exp) {
  if (!exp) {
    throw new Error("Missing exp claim");
  }
  const timeNow = Math.floor(Date.now() / 1e3);
  if (exp <= timeNow) {
    throw new Error("JWT has expired");
  }
}
__name(validateExp, "validateExp");
function getAlgorithm(alg) {
  switch (alg) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
__name(getAlgorithm, "getAlgorithm");
function validateUUID(str) {
  if (!UUID_REGEX.test(str)) {
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
  }
}
__name(validateUUID, "validateUUID");
function userNotAvailableProxy() {
  const proxyTarget = {};
  return new Proxy(proxyTarget, {
    get: /* @__PURE__ */ __name2((target, prop) => {
      if (prop === "__isUserNotAvailableProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") {
          return void 0;
        }
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
    }, "get"),
    set: /* @__PURE__ */ __name2((_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }, "set"),
    deleteProperty: /* @__PURE__ */ __name2((_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }, "deleteProperty")
  });
}
__name(userNotAvailableProxy, "userNotAvailableProxy");
function insecureUserWarningProxy(user, suppressWarningRef) {
  return new Proxy(user, {
    get: /* @__PURE__ */ __name2((target, prop, receiver) => {
      if (prop === "__isInsecureUserWarningProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)" || sProp === "Symbol(nodejs.util.inspect.custom)") {
          return Reflect.get(target, prop, receiver);
        }
      }
      if (!suppressWarningRef.value && typeof prop === "string") {
        console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
        suppressWarningRef.value = true;
      }
      return Reflect.get(target, prop, receiver);
    }, "get")
  });
}
__name(insecureUserWarningProxy, "insecureUserWarningProxy");
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
__name(deepClone, "deepClone");
var isBrowser;
var localStorageWriteTests;
var supportsLocalStorage;
var resolveFetch5;
var looksLikeFetchResponse;
var setItemAsync;
var getItemAsync;
var removeItemAsync;
var Deferred;
var API_VERSION_REGEX;
var UUID_REGEX;
var init_helpers4 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/helpers.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_constants5();
    init_errors3();
    init_base64url();
    __name2(expiresAt, "expiresAt");
    __name2(uuid, "uuid");
    isBrowser = /* @__PURE__ */ __name2(() => typeof window !== "undefined" && typeof document !== "undefined", "isBrowser");
    localStorageWriteTests = {
      tested: false,
      writable: false
    };
    supportsLocalStorage = /* @__PURE__ */ __name2(() => {
      if (!isBrowser()) {
        return false;
      }
      try {
        if (typeof globalThis.localStorage !== "object") {
          return false;
        }
      } catch (e) {
        return false;
      }
      if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
      }
      const randomKey = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
      } catch (e) {
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
      }
      return localStorageWriteTests.writable;
    }, "supportsLocalStorage");
    __name2(parseParametersFromURL, "parseParametersFromURL");
    resolveFetch5 = /* @__PURE__ */ __name2((customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = /* @__PURE__ */ __name2((...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)), "_fetch");
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    }, "resolveFetch");
    looksLikeFetchResponse = /* @__PURE__ */ __name2((maybeResponse) => {
      return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
    }, "looksLikeFetchResponse");
    setItemAsync = /* @__PURE__ */ __name2(async (storage, key, data) => {
      await storage.setItem(key, JSON.stringify(data));
    }, "setItemAsync");
    getItemAsync = /* @__PURE__ */ __name2(async (storage, key) => {
      const value = await storage.getItem(key);
      if (!value) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (_a2) {
        return value;
      }
    }, "getItemAsync");
    removeItemAsync = /* @__PURE__ */ __name2(async (storage, key) => {
      await storage.removeItem(key);
    }, "removeItemAsync");
    Deferred = class _Deferred {
      static {
        __name(this, "_Deferred");
      }
      static {
        __name2(this, "Deferred");
      }
      constructor() {
        ;
        this.promise = new _Deferred.promiseConstructor((res, rej) => {
          ;
          this.resolve = res;
          this.reject = rej;
        });
      }
    };
    Deferred.promiseConstructor = Promise;
    __name2(decodeJWT, "decodeJWT");
    __name2(sleep, "sleep");
    __name2(retryable, "retryable");
    __name2(dec2hex, "dec2hex");
    __name2(generatePKCEVerifier, "generatePKCEVerifier");
    __name2(sha256, "sha256");
    __name2(generatePKCEChallenge, "generatePKCEChallenge");
    __name2(getCodeChallengeAndMethod, "getCodeChallengeAndMethod");
    API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
    __name2(parseResponseAPIVersion, "parseResponseAPIVersion");
    __name2(validateExp, "validateExp");
    __name2(getAlgorithm, "getAlgorithm");
    UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    __name2(validateUUID, "validateUUID");
    __name2(userNotAvailableProxy, "userNotAvailableProxy");
    __name2(insecureUserWarningProxy, "insecureUserWarningProxy");
    __name2(deepClone, "deepClone");
  }
});
async function handleError3(error) {
  var _a2;
  if (!looksLikeFetchResponse(error)) {
    throw new AuthRetryableFetchError(_getErrorMessage3(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage3(error), error.status);
  }
  let data;
  try {
    data = await error.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage3(e), e);
  }
  let errorCode = void 0;
  const responseAPIVersion = parseResponseAPIVersion(error);
  if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") {
    errorCode = data.code;
  } else if (typeof data === "object" && data && typeof data.error_code === "string") {
    errorCode = data.error_code;
  }
  if (!errorCode) {
    if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
      throw new AuthWeakPasswordError(_getErrorMessage3(data), error.status, data.weak_password.reasons);
    }
  } else if (errorCode === "weak_password") {
    throw new AuthWeakPasswordError(_getErrorMessage3(data), error.status, ((_a2 = data.weak_password) === null || _a2 === void 0 ? void 0 : _a2.reasons) || []);
  } else if (errorCode === "session_not_found") {
    throw new AuthSessionMissingError();
  }
  throw new AuthApiError(_getErrorMessage3(data), error.status || 500, errorCode);
}
__name(handleError3, "handleError3");
async function _request(fetcher, method, url, options) {
  var _a2;
  const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
  if (!headers[API_VERSION_HEADER_NAME]) {
    headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
  }
  if (options === null || options === void 0 ? void 0 : options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }
  const qs = (_a2 = options === null || options === void 0 ? void 0 : options.query) !== null && _a2 !== void 0 ? _a2 : {};
  if (options === null || options === void 0 ? void 0 : options.redirectTo) {
    qs["redirect_to"] = options.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data = await _handleRequest3(fetcher, method, url + queryString, {
    headers,
    noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
  }, {}, options === null || options === void 0 ? void 0 : options.body);
  return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
}
__name(_request, "_request");
async function _handleRequest3(fetcher, method, url, options, parameters, body) {
  const requestParams = _getRequestParams3(method, options, parameters, body);
  let result;
  try {
    result = await fetcher(url, Object.assign({}, requestParams));
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage3(e), 0);
  }
  if (!result.ok) {
    await handleError3(result);
  }
  if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError3(e);
  }
}
__name(_handleRequest3, "_handleRequest3");
function _sessionResponse(data) {
  var _a2;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    if (!data.expires_at) {
      session.expires_at = expiresAt(data.expires_in);
    }
  }
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { session, user }, error: null };
}
__name(_sessionResponse, "_sessionResponse");
function _sessionResponsePassword(data) {
  const response = _sessionResponse(data);
  if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    response.data.weak_password = data.weak_password;
  }
  return response;
}
__name(_sessionResponsePassword, "_sessionResponsePassword");
function _userResponse(data) {
  var _a2;
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { user }, error: null };
}
__name(_userResponse, "_userResponse");
function _ssoResponse(data) {
  return { data, error: null };
}
__name(_ssoResponse, "_ssoResponse");
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
__name(_generateLinkResponse, "_generateLinkResponse");
function _noResolveJsonResponse(data) {
  return data;
}
__name(_noResolveJsonResponse, "_noResolveJsonResponse");
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
__name(hasSession, "hasSession");
var _getErrorMessage3;
var NETWORK_ERROR_CODES;
var _getRequestParams3;
var init_fetch4 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/fetch.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_constants5();
    init_helpers4();
    init_errors3();
    _getErrorMessage3 = /* @__PURE__ */ __name2((err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err), "_getErrorMessage");
    NETWORK_ERROR_CODES = [502, 503, 504];
    __name2(handleError3, "handleError");
    _getRequestParams3 = /* @__PURE__ */ __name2((method, options, parameters, body) => {
      const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
      params.body = JSON.stringify(body);
      return Object.assign(Object.assign({}, params), parameters);
    }, "_getRequestParams");
    __name2(_request, "_request");
    __name2(_handleRequest3, "_handleRequest");
    __name2(_sessionResponse, "_sessionResponse");
    __name2(_sessionResponsePassword, "_sessionResponsePassword");
    __name2(_userResponse, "_userResponse");
    __name2(_ssoResponse, "_ssoResponse");
    __name2(_generateLinkResponse, "_generateLinkResponse");
    __name2(_noResolveJsonResponse, "_noResolveJsonResponse");
    __name2(hasSession, "hasSession");
  }
});
var SIGN_OUT_SCOPES;
var init_types3 = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/types.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    SIGN_OUT_SCOPES = ["global", "local", "others"];
  }
});
var GoTrueAdminApi;
var init_GoTrueAdminApi = __esm({
  "node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_fetch4();
    init_helpers4();
    init_types3();
    init_errors3();
    GoTrueAdminApi = class {
      static {
        __name(this, "GoTrueAdminApi");
      }
      static {
        __name2(this, "GoTrueAdminApi");
      }
      constructor({ url = "", headers = {}, fetch: fetch3 }) {
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch5(fetch3);
        this.mfa = {
          listFactors: this._listFactors.bind(this),
          deleteFactor: this._deleteFactor.bind(this)
        };
        this.oauth = {
          listClients: this._listOAuthClients.bind(this),
          createClient: this._createOAuthClient.bind(this),
          getClient: this._getOAuthClient.bind(this),
          updateClient: this._updateOAuthClient.bind(this),
          deleteClient: this._deleteOAuthClient.bind(this),
          regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
        };
      }
      /**
       * Removes a logged-in session.
       * @param jwt A valid, logged-in JWT.
       * @param scope The logout sope.
       */
      async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
        if (SIGN_OUT_SCOPES.indexOf(scope) < 0) {
          throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
        }
        try {
          await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
            headers: this.headers,
            jwt,
            noResolveJson: true
          });
          return { data: null, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Sends an invite link to an email address.
       * @param email The email address of the user.
       * @param options Additional options to be included when inviting.
       */
      async inviteUserByEmail(email, options = {}) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/invite`, {
            body: { email, data: options.data },
            headers: this.headers,
            redirectTo: options.redirectTo,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Generates email links and OTPs to be sent via a custom email provider.
       * @param email The user's email.
       * @param options.password User password. For signup only.
       * @param options.data Optional user metadata. For signup only.
       * @param options.redirectTo The redirect url which should be appended to the generated link
       */
      async generateLink(params) {
        try {
          const { options } = params, rest = __rest(params, ["options"]);
          const body = Object.assign(Object.assign({}, rest), options);
          if ("newEmail" in rest) {
            body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
            delete body["newEmail"];
          }
          return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
            body,
            headers: this.headers,
            xform: _generateLinkResponse,
            redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
          });
        } catch (error) {
          if (isAuthError(error)) {
            return {
              data: {
                properties: null,
                user: null
              },
              error
            };
          }
          throw error;
        }
      }
      // User Admin API
      /**
       * Creates a new user.
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async createUser(attributes) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Get a list of users.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
       */
      async listUsers(params) {
        var _a2, _b, _c, _d, _e, _f, _g;
        try {
          const pagination = { nextPage: null, lastPage: 0, total: 0 };
          const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
            headers: this.headers,
            noResolveJson: true,
            query: {
              page: (_b = (_a2 = params === null || params === void 0 ? void 0 : params.page) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : "",
              per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
            },
            xform: _noResolveJsonResponse
          });
          if (response.error)
            throw response.error;
          const users = await response.json();
          const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
          const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
          if (links.length > 0) {
            links.forEach((link) => {
              const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
              const rel = JSON.parse(link.split(";")[1].split("=")[1]);
              pagination[`${rel}Page`] = page;
            });
            pagination.total = parseInt(total);
          }
          return { data: Object.assign(Object.assign({}, users), pagination), error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { users: [] }, error };
          }
          throw error;
        }
      }
      /**
       * Get user by id.
       *
       * @param uid The user's unique identifier
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async getUserById(uid) {
        validateUUID(uid);
        try {
          return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Updates the user data.
       *
       * @param attributes The data you want to update.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async updateUserById(uid, attributes) {
        validateUUID(uid);
        try {
          return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Delete a user. Requires a `service_role` key.
       *
       * @param id The user id you want to remove.
       * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
       * Defaults to false for backward compatibility.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async deleteUser(id, shouldSoftDelete = false) {
        validateUUID(id);
        try {
          return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
            headers: this.headers,
            body: {
              should_soft_delete: shouldSoftDelete
            },
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      async _listFactors(params) {
        validateUUID(params.userId);
        try {
          const { data, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
            headers: this.headers,
            xform: /* @__PURE__ */ __name2((factors) => {
              return { data: { factors }, error: null };
            }, "xform")
          });
          return { data, error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async _deleteFactor(params) {
        validateUUID(params.userId);
        validateUUID(params.id);
        try {
          const data = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
            headers: this.headers
          });
          return { data, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Lists all OAuth clients with optional pagination.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _listOAuthClients(params) {
        var _a2, _b, _c, _d, _e, _f, _g;
        try {
          const pagination = { nextPage: null, lastPage: 0, total: 0 };
          const response = await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
            headers: this.headers,
            noResolveJson: true,
            query: {
              page: (_b = (_a2 = params === null || params === void 0 ? void 0 : params.page) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : "",
              per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
            },
            xform: _noResolveJsonResponse
          });
          if (response.error)
            throw response.error;
          const clients = await response.json();
          const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
          const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
          if (links.length > 0) {
            links.forEach((link) => {
              const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
              const rel = JSON.parse(link.split(";")[1].split("=")[1]);
              pagination[`${rel}Page`] = page;
            });
            pagination.total = parseInt(total);
          }
          return { data: Object.assign(Object.assign({}, clients), pagination), error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { clients: [] }, error };
          }
          throw error;
        }
      }
      /**
       * Creates a new OAuth client.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _createOAuthClient(params) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
            body: params,
            headers: this.headers,
            xform: /* @__PURE__ */ __name2((client) => {
              return { data: client, error: null };
            }, "xform")
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Gets details of a specific OAuth client.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _getOAuthClient(clientId) {
        try {
          return await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients/${clientId}`, {
            headers: this.headers,
            xform: /* @__PURE__ */ __name2((client) => {
              return { data: client, error: null };
            }, "xform")
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Updates an existing OAuth client.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _updateOAuthClient(clientId, params) {
        try {
          return await _request(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${clientId}`, {
            body: params,
            headers: this.headers,
            xform: /* @__PURE__ */ __name2((client) => {
              return { data: client, error: null };
            }, "xform")
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Deletes an OAuth client.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _deleteOAuthClient(clientId) {
        try {
          await _request(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${clientId}`, {
            headers: this.headers,
            noResolveJson: true
          });
          return { data: null, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Regenerates the secret for an OAuth client.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async _regenerateOAuthClientSecret(clientId) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients/${clientId}/regenerate_secret`, {
            headers: this.headers,
            xform: /* @__PURE__ */ __name2((client) => {
              return { data: client, error: null };
            }, "xform")
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
    };
  }
});
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: /* @__PURE__ */ __name2((key) => {
      return store[key] || null;
    }, "getItem"),
    setItem: /* @__PURE__ */ __name2((key, value) => {
      store[key] = value;
    }, "setItem"),
    removeItem: /* @__PURE__ */ __name2((key) => {
      delete store[key];
    }, "removeItem")
  };
}
__name(memoryLocalStorageAdapter, "memoryLocalStorageAdapter");
var init_local_storage = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/local-storage.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(memoryLocalStorageAdapter, "memoryLocalStorageAdapter");
  }
});
async function navigatorLock(name, acquireTimeout, fn) {
  if (internals.debug) {
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
  }
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      abortController.abort();
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
      }
    }, acquireTimeout);
  }
  return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
    mode: "exclusive",
    ifAvailable: true
  } : {
    mode: "exclusive",
    signal: abortController.signal
  }, async (lock) => {
    if (lock) {
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
      }
      try {
        return await fn();
      } finally {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
        }
      }
    } else {
      if (acquireTimeout === 0) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
        }
        throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
      } else {
        if (internals.debug) {
          try {
            const result = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        }
        console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
        return await fn();
      }
    }
  }));
}
__name(navigatorLock, "navigatorLock");
var internals;
var LockAcquireTimeoutError;
var NavigatorLockAcquireTimeoutError;
var init_locks = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/locks.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_helpers4();
    internals = {
      /**
       * @experimental
       */
      debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
    };
    LockAcquireTimeoutError = class extends Error {
      static {
        __name(this, "LockAcquireTimeoutError");
      }
      static {
        __name2(this, "LockAcquireTimeoutError");
      }
      constructor(message) {
        super(message);
        this.isAcquireTimeout = true;
      }
    };
    NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
      static {
        __name(this, "NavigatorLockAcquireTimeoutError");
      }
      static {
        __name2(this, "NavigatorLockAcquireTimeoutError");
      }
    };
    __name2(navigatorLock, "navigatorLock");
  }
});
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: /* @__PURE__ */ __name2(function() {
        return this;
      }, "get"),
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
__name(polyfillGlobalThis, "polyfillGlobalThis");
var init_polyfills = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/polyfills.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(polyfillGlobalThis, "polyfillGlobalThis");
  }
});
function getAddress(address) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
  }
  return address.toLowerCase();
}
__name(getAddress, "getAddress");
function fromHex(hex) {
  return parseInt(hex, 16);
}
__name(fromHex, "fromHex");
function toHex(value) {
  const bytes = new TextEncoder().encode(value);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return "0x" + hex;
}
__name(toHex, "toHex");
function createSiweMessage(parameters) {
  var _a2;
  const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version: version5 } = parameters;
  {
    if (!Number.isInteger(chainId))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
    if (!domain)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
    if (nonce && nonce.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
    if (!uri)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
    if (version5 !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version5}`);
    if ((_a2 = parameters.statement) === null || _a2 === void 0 ? void 0 : _a2.includes("\n"))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
  }
  const address = getAddress(parameters.address);
  const origin = scheme ? `${scheme}://${domain}` : domain;
  const statement = parameters.statement ? `${parameters.statement}
` : "";
  const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
  let suffix = `URI: ${uri}
Version: ${version5}
Chain ID: ${chainId}${nonce ? `
Nonce: ${nonce}` : ""}
Issued At: ${issuedAt.toISOString()}`;
  if (expirationTime)
    suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
  if (notBefore)
    suffix += `
Not Before: ${notBefore.toISOString()}`;
  if (requestId)
    suffix += `
Request ID: ${requestId}`;
  if (resources) {
    let content = "\nResources:";
    for (const resource of resources) {
      if (!resource || typeof resource !== "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
      content += `
- ${resource}`;
    }
    suffix += content;
  }
  return `${prefix}
${suffix}`;
}
__name(createSiweMessage, "createSiweMessage");
var init_ethereum = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(getAddress, "getAddress");
    __name2(fromHex, "fromHex");
    __name2(toHex, "toHex");
    __name2(createSiweMessage, "createSiweMessage");
  }
});
function identifyRegistrationError({ error, options }) {
  var _a2, _b, _c;
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "ConstraintError") {
    if (((_a2 = publicKey.authenticatorSelection) === null || _a2 === void 0 ? void 0 : _a2.requireResidentKey) === true) {
      return new WebAuthnError({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: error
      });
    } else if (
      // @ts-ignore: `mediation` doesn't yet exist on CredentialCreationOptions but it's possible as of Sept 2024
      options.mediation === "conditional" && ((_b = publicKey.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.userVerification) === "required"
    ) {
      return new WebAuthnError({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: error
      });
    } else if (((_c = publicKey.authenticatorSelection) === null || _c === void 0 ? void 0 : _c.userVerification) === "required") {
      return new WebAuthnError({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: error
      });
    }
  } else if (error.name === "InvalidStateError") {
    return new WebAuthnError({
      message: "The authenticator was previously registered",
      code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
      cause: error
    });
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "NotSupportedError") {
    const validPubKeyCredParams = publicKey.pubKeyCredParams.filter((param) => param.type === "public-key");
    if (validPubKeyCredParams.length === 0) {
      return new WebAuthnError({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: error
      });
    }
    return new WebAuthnError({
      message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
      code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rp.id !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "TypeError") {
    if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) {
      return new WebAuthnError({
        message: "User ID was not between 1 and 64 characters",
        code: "ERROR_INVALID_USER_ID_LENGTH",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new credential",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}
__name(identifyRegistrationError, "identifyRegistrationError");
function identifyAuthenticationError({ error, options }) {
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rpId !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}
__name(identifyAuthenticationError, "identifyAuthenticationError");
var WebAuthnError;
var WebAuthnUnknownError;
var init_webauthn_errors = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/webauthn.errors.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_webauthn();
    WebAuthnError = class extends Error {
      static {
        __name(this, "WebAuthnError");
      }
      static {
        __name2(this, "WebAuthnError");
      }
      constructor({ message, code, cause, name }) {
        var _a2;
        super(message, { cause });
        this.__isWebAuthnError = true;
        this.name = (_a2 = name !== null && name !== void 0 ? name : cause instanceof Error ? cause.name : void 0) !== null && _a2 !== void 0 ? _a2 : "Unknown Error";
        this.code = code;
      }
    };
    WebAuthnUnknownError = class extends WebAuthnError {
      static {
        __name(this, "WebAuthnUnknownError");
      }
      static {
        __name2(this, "WebAuthnUnknownError");
      }
      constructor(message, originalError) {
        super({
          code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
          cause: originalError,
          message
        });
        this.name = "WebAuthnUnknownError";
        this.originalError = originalError;
      }
    };
    __name2(identifyRegistrationError, "identifyRegistrationError");
    __name2(identifyAuthenticationError, "identifyAuthenticationError");
  }
});
function deserializeCredentialCreationOptions(options) {
  if (!options) {
    throw new Error("Credential creation options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") {
    return PublicKeyCredential.parseCreationOptionsFromJSON(
      /** we assert the options here as typescript still doesn't know about future webauthn types */
      options
    );
  }
  const { challenge: challengeStr, user: userOpts, excludeCredentials } = options, restOptions = __rest(
    options,
    ["challenge", "user", "excludeCredentials"]
  );
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const user = Object.assign(Object.assign({}, userOpts), { id: base64UrlToUint8Array(userOpts.id).buffer });
  const result = Object.assign(Object.assign({}, restOptions), {
    challenge,
    user
  });
  if (excludeCredentials && excludeCredentials.length > 0) {
    result.excludeCredentials = new Array(excludeCredentials.length);
    for (let i = 0; i < excludeCredentials.length; i++) {
      const cred = excludeCredentials[i];
      result.excludeCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: cred.transports
      });
    }
  }
  return result;
}
__name(deserializeCredentialCreationOptions, "deserializeCredentialCreationOptions");
function deserializeCredentialRequestOptions(options) {
  if (!options) {
    throw new Error("Credential request options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") {
    return PublicKeyCredential.parseRequestOptionsFromJSON(options);
  }
  const { challenge: challengeStr, allowCredentials } = options, restOptions = __rest(
    options,
    ["challenge", "allowCredentials"]
  );
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const result = Object.assign(Object.assign({}, restOptions), { challenge });
  if (allowCredentials && allowCredentials.length > 0) {
    result.allowCredentials = new Array(allowCredentials.length);
    for (let i = 0; i < allowCredentials.length; i++) {
      const cred = allowCredentials[i];
      result.allowCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: cred.transports
      });
    }
  }
  return result;
}
__name(deserializeCredentialRequestOptions, "deserializeCredentialRequestOptions");
function serializeCredentialCreationResponse(credential) {
  var _a2;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  return {
    id: credential.id,
    rawId: credential.id,
    response: {
      attestationObject: bytesToBase64URL(new Uint8Array(credential.response.attestationObject)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(credential.response.clientDataJSON))
    },
    type: "public-key",
    clientExtensionResults: credential.getClientExtensionResults(),
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (_a2 = credentialWithAttachment.authenticatorAttachment) !== null && _a2 !== void 0 ? _a2 : void 0
  };
}
__name(serializeCredentialCreationResponse, "serializeCredentialCreationResponse");
function serializeCredentialRequestResponse(credential) {
  var _a2;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  const clientExtensionResults = credential.getClientExtensionResults();
  const assertionResponse = credential.response;
  return {
    id: credential.id,
    rawId: credential.id,
    // W3C spec expects rawId to match id for JSON format
    response: {
      authenticatorData: bytesToBase64URL(new Uint8Array(assertionResponse.authenticatorData)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(assertionResponse.clientDataJSON)),
      signature: bytesToBase64URL(new Uint8Array(assertionResponse.signature)),
      userHandle: assertionResponse.userHandle ? bytesToBase64URL(new Uint8Array(assertionResponse.userHandle)) : void 0
    },
    type: "public-key",
    clientExtensionResults,
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (_a2 = credentialWithAttachment.authenticatorAttachment) !== null && _a2 !== void 0 ? _a2 : void 0
  };
}
__name(serializeCredentialRequestResponse, "serializeCredentialRequestResponse");
function isValidDomain(hostname) {
  return (
    // Consider localhost valid as well since it's okay wrt Secure Contexts
    hostname === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname)
  );
}
__name(isValidDomain, "isValidDomain");
function browserSupportsWebAuthn() {
  var _a2, _b;
  return !!(isBrowser() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((_a2 = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _a2 === void 0 ? void 0 : _a2.create) === "function" && typeof ((_b = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _b === void 0 ? void 0 : _b.get) === "function");
}
__name(browserSupportsWebAuthn, "browserSupportsWebAuthn");
async function createCredential(options) {
  try {
    const response = await navigator.credentials.create(
      /** we assert the type here until typescript types are updated */
      options
    );
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyRegistrationError({
        error: err,
        options
      })
    };
  }
}
__name(createCredential, "createCredential");
async function getCredential(options) {
  try {
    const response = await navigator.credentials.get(
      /** we assert the type here until typescript types are updated */
      options
    );
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyAuthenticationError({
        error: err,
        options
      })
    };
  }
}
__name(getCredential, "getCredential");
function deepMerge(...sources) {
  const isObject = /* @__PURE__ */ __name2((val) => val !== null && typeof val === "object" && !Array.isArray(val), "isObject");
  const isArrayBufferLike = /* @__PURE__ */ __name2((val) => val instanceof ArrayBuffer || ArrayBuffer.isView(val), "isArrayBufferLike");
  const result = {};
  for (const source of sources) {
    if (!source)
      continue;
    for (const key in source) {
      const value = source[key];
      if (value === void 0)
        continue;
      if (Array.isArray(value)) {
        result[key] = value;
      } else if (isArrayBufferLike(value)) {
        result[key] = value;
      } else if (isObject(value)) {
        const existing = result[key];
        if (isObject(existing)) {
          result[key] = deepMerge(existing, value);
        } else {
          result[key] = deepMerge(value);
        }
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
__name(deepMerge, "deepMerge");
function mergeCredentialCreationOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_CREATION_OPTIONS, baseOptions, overrides || {});
}
__name(mergeCredentialCreationOptions, "mergeCredentialCreationOptions");
function mergeCredentialRequestOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_REQUEST_OPTIONS, baseOptions, overrides || {});
}
__name(mergeCredentialRequestOptions, "mergeCredentialRequestOptions");
var WebAuthnAbortService;
var webAuthnAbortService;
var DEFAULT_CREATION_OPTIONS;
var DEFAULT_REQUEST_OPTIONS;
var WebAuthnApi;
var init_webauthn = __esm({
  "node_modules/@supabase/auth-js/dist/module/lib/webauthn.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_tslib_es6();
    init_base64url();
    init_errors3();
    init_helpers4();
    init_webauthn_errors();
    WebAuthnAbortService = class {
      static {
        __name(this, "WebAuthnAbortService");
      }
      static {
        __name2(this, "WebAuthnAbortService");
      }
      /**
       * Create an abort signal for a new WebAuthn operation.
       * Automatically cancels any existing operation.
       *
       * @returns {AbortSignal} Signal to pass to navigator.credentials.create() or .get()
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal MDN - AbortSignal}
       */
      createNewAbortSignal() {
        if (this.controller) {
          const abortError = new Error("Cancelling existing WebAuthn API call for new one");
          abortError.name = "AbortError";
          this.controller.abort(abortError);
        }
        const newController = new AbortController();
        this.controller = newController;
        return newController.signal;
      }
      /**
       * Manually cancel the current WebAuthn operation.
       * Useful for cleaning up when user cancels or navigates away.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort MDN - AbortController.abort}
       */
      cancelCeremony() {
        if (this.controller) {
          const abortError = new Error("Manually cancelling existing WebAuthn API call");
          abortError.name = "AbortError";
          this.controller.abort(abortError);
          this.controller = void 0;
        }
      }
    };
    webAuthnAbortService = new WebAuthnAbortService();
    __name2(deserializeCredentialCreationOptions, "deserializeCredentialCreationOptions");
    __name2(deserializeCredentialRequestOptions, "deserializeCredentialRequestOptions");
    __name2(serializeCredentialCreationResponse, "serializeCredentialCreationResponse");
    __name2(serializeCredentialRequestResponse, "serializeCredentialRequestResponse");
    __name2(isValidDomain, "isValidDomain");
    __name2(browserSupportsWebAuthn, "browserSupportsWebAuthn");
    __name2(createCredential, "createCredential");
    __name2(getCredential, "getCredential");
    DEFAULT_CREATION_OPTIONS = {
      hints: ["security-key"],
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
        requireResidentKey: false,
        /** set to preferred because older yubikeys don't have PIN/Biometric */
        userVerification: "preferred",
        residentKey: "discouraged"
      },
      attestation: "none"
    };
    DEFAULT_REQUEST_OPTIONS = {
      /** set to preferred because older yubikeys don't have PIN/Biometric */
      userVerification: "preferred",
      hints: ["security-key"]
    };
    __name2(deepMerge, "deepMerge");
    __name2(mergeCredentialCreationOptions, "mergeCredentialCreationOptions");
    __name2(mergeCredentialRequestOptions, "mergeCredentialRequestOptions");
    WebAuthnApi = class {
      static {
        __name(this, "WebAuthnApi");
      }
      static {
        __name2(this, "WebAuthnApi");
      }
      constructor(client) {
        this.client = client;
        this.enroll = this._enroll.bind(this);
        this.challenge = this._challenge.bind(this);
        this.verify = this._verify.bind(this);
        this.authenticate = this._authenticate.bind(this);
        this.register = this._register.bind(this);
      }
      /**
       * Enroll a new WebAuthn factor.
       * Creates an unverified WebAuthn factor that must be verified with a credential.
       *
       * @experimental This method is experimental and may change in future releases
       * @param {Omit<MFAEnrollWebauthnParams, 'factorType'>} params - Enrollment parameters (friendlyName required)
       * @returns {Promise<AuthMFAEnrollWebauthnResponse>} Enrolled factor details or error
       * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registering a New Credential}
       */
      async _enroll(params) {
        return this.client.mfa.enroll(Object.assign(Object.assign({}, params), { factorType: "webauthn" }));
      }
      /**
       * Challenge for WebAuthn credential creation or authentication.
       * Combines server challenge with browser credential operations.
       * Handles both registration (create) and authentication (request) flows.
       *
       * @experimental This method is experimental and may change in future releases
       * @param {MFAChallengeWebauthnParams & { friendlyName?: string; signal?: AbortSignal }} params - Challenge parameters including factorId
       * @param {Object} overrides - Allows you to override the parameters passed to navigator.credentials
       * @param {PublicKeyCredentialCreationOptionsFuture} overrides.create - Override options for credential creation
       * @param {PublicKeyCredentialRequestOptionsFuture} overrides.request - Override options for credential request
       * @returns {Promise<RequestResult>} Challenge response with credential or error
       * @see {@link https://w3c.github.io/webauthn/#sctn-credential-creation W3C WebAuthn Spec - Credential Creation}
       * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying Assertion}
       */
      async _challenge({ factorId, webauthn, friendlyName, signal }, overrides) {
        try {
          const { data: challengeResponse, error: challengeError } = await this.client.mfa.challenge({
            factorId,
            webauthn
          });
          if (!challengeResponse) {
            return { data: null, error: challengeError };
          }
          const abortSignal = signal !== null && signal !== void 0 ? signal : webAuthnAbortService.createNewAbortSignal();
          if (challengeResponse.webauthn.type === "create") {
            const { user } = challengeResponse.webauthn.credential_options.publicKey;
            if (!user.name) {
              user.name = `${user.id}:${friendlyName}`;
            }
            if (!user.displayName) {
              user.displayName = user.name;
            }
          }
          switch (challengeResponse.webauthn.type) {
            case "create": {
              const options = mergeCredentialCreationOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.create);
              const { data, error } = await createCredential({
                publicKey: options,
                signal: abortSignal
              });
              if (data) {
                return {
                  data: {
                    factorId,
                    challengeId: challengeResponse.id,
                    webauthn: {
                      type: challengeResponse.webauthn.type,
                      credential_response: data
                    }
                  },
                  error: null
                };
              }
              return { data: null, error };
            }
            case "request": {
              const options = mergeCredentialRequestOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.request);
              const { data, error } = await getCredential(Object.assign(Object.assign({}, challengeResponse.webauthn.credential_options), { publicKey: options, signal: abortSignal }));
              if (data) {
                return {
                  data: {
                    factorId,
                    challengeId: challengeResponse.id,
                    webauthn: {
                      type: challengeResponse.webauthn.type,
                      credential_response: data
                    }
                  },
                  error: null
                };
              }
              return { data: null, error };
            }
          }
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          return {
            data: null,
            error: new AuthUnknownError("Unexpected error in challenge", error)
          };
        }
      }
      /**
       * Verify a WebAuthn credential with the server.
       * Completes the WebAuthn ceremony by sending the credential to the server for verification.
       *
       * @experimental This method is experimental and may change in future releases
       * @param {Object} params - Verification parameters
       * @param {string} params.challengeId - ID of the challenge being verified
       * @param {string} params.factorId - ID of the WebAuthn factor
       * @param {MFAVerifyWebauthnParams<T>['webauthn']} params.webauthn - WebAuthn credential response
       * @returns {Promise<AuthMFAVerifyResponse>} Verification result with session or error
       * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying an Authentication Assertion}
       * */
      async _verify({ challengeId, factorId, webauthn }) {
        return this.client.mfa.verify({
          factorId,
          challengeId,
          webauthn
        });
      }
      /**
       * Complete WebAuthn authentication flow.
       * Performs challenge and verification in a single operation for existing credentials.
       *
       * @experimental This method is experimental and may change in future releases
       * @param {Object} params - Authentication parameters
       * @param {string} params.factorId - ID of the WebAuthn factor to authenticate with
       * @param {Object} params.webauthn - WebAuthn configuration
       * @param {string} params.webauthn.rpId - Relying Party ID (defaults to current hostname)
       * @param {string[]} params.webauthn.rpOrigins - Allowed origins (defaults to current origin)
       * @param {AbortSignal} params.webauthn.signal - Optional abort signal
       * @param {PublicKeyCredentialRequestOptionsFuture} overrides - Override options for navigator.credentials.get
       * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Authentication result
       * @see {@link https://w3c.github.io/webauthn/#sctn-authentication W3C WebAuthn Spec - Authentication Ceremony}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions MDN - PublicKeyCredentialRequestOptions}
       */
      async _authenticate({ factorId, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } }, overrides) {
        if (!rpId) {
          return {
            data: null,
            error: new AuthError("rpId is required for WebAuthn authentication")
          };
        }
        try {
          if (!browserSupportsWebAuthn()) {
            return {
              data: null,
              error: new AuthUnknownError("Browser does not support WebAuthn", null)
            };
          }
          const { data: challengeResponse, error: challengeError } = await this.challenge({
            factorId,
            webauthn: { rpId, rpOrigins },
            signal
          }, { request: overrides });
          if (!challengeResponse) {
            return { data: null, error: challengeError };
          }
          const { webauthn } = challengeResponse;
          return this._verify({
            factorId,
            challengeId: challengeResponse.challengeId,
            webauthn: {
              type: webauthn.type,
              rpId,
              rpOrigins,
              credential_response: webauthn.credential_response
            }
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          return {
            data: null,
            error: new AuthUnknownError("Unexpected error in authenticate", error)
          };
        }
      }
      /**
       * Complete WebAuthn registration flow.
       * Performs enrollment, challenge, and verification in a single operation for new credentials.
       *
       * @experimental This method is experimental and may change in future releases
       * @param {Object} params - Registration parameters
       * @param {string} params.friendlyName - User-friendly name for the credential
       * @param {string} params.rpId - Relying Party ID (defaults to current hostname)
       * @param {string[]} params.rpOrigins - Allowed origins (defaults to current origin)
       * @param {AbortSignal} params.signal - Optional abort signal
       * @param {PublicKeyCredentialCreationOptionsFuture} overrides - Override options for navigator.credentials.create
       * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Registration result
       * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registration Ceremony}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions MDN - PublicKeyCredentialCreationOptions}
       */
      async _register({ friendlyName, rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal }, overrides) {
        if (!rpId) {
          return {
            data: null,
            error: new AuthError("rpId is required for WebAuthn registration")
          };
        }
        try {
          if (!browserSupportsWebAuthn()) {
            return {
              data: null,
              error: new AuthUnknownError("Browser does not support WebAuthn", null)
            };
          }
          const { data: factor, error: enrollError } = await this._enroll({
            friendlyName
          });
          if (!factor) {
            await this.client.mfa.listFactors().then((factors) => {
              var _a2;
              return (_a2 = factors.data) === null || _a2 === void 0 ? void 0 : _a2.all.find((v) => v.factor_type === "webauthn" && v.friendly_name === friendlyName && v.status !== "unverified");
            }).then((factor2) => factor2 ? this.client.mfa.unenroll({ factorId: factor2 === null || factor2 === void 0 ? void 0 : factor2.id }) : void 0);
            return { data: null, error: enrollError };
          }
          const { data: challengeResponse, error: challengeError } = await this._challenge({
            factorId: factor.id,
            friendlyName: factor.friendly_name,
            webauthn: { rpId, rpOrigins },
            signal
          }, {
            create: overrides
          });
          if (!challengeResponse) {
            return { data: null, error: challengeError };
          }
          return this._verify({
            factorId: factor.id,
            challengeId: challengeResponse.challengeId,
            webauthn: {
              rpId,
              rpOrigins,
              type: challengeResponse.webauthn.type,
              credential_response: challengeResponse.webauthn.credential_response
            }
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          return {
            data: null,
            error: new AuthUnknownError("Unexpected error in register", error)
          };
        }
      }
    };
  }
});
async function lockNoOp(name, acquireTimeout, fn) {
  return await fn();
}
__name(lockNoOp, "lockNoOp");
var DEFAULT_OPTIONS;
var GLOBAL_JWKS;
var GoTrueClient;
var GoTrueClient_default;
var init_GoTrueClient = __esm({
  "node_modules/@supabase/auth-js/dist/module/GoTrueClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_GoTrueAdminApi();
    init_constants5();
    init_errors3();
    init_fetch4();
    init_helpers4();
    init_local_storage();
    init_locks();
    init_polyfills();
    init_version4();
    init_base64url();
    init_ethereum();
    init_webauthn();
    polyfillGlobalThis();
    DEFAULT_OPTIONS = {
      url: GOTRUE_URL,
      storageKey: STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: DEFAULT_HEADERS4,
      flowType: "implicit",
      debug: false,
      hasCustomAuthorizationHeader: false
    };
    __name2(lockNoOp, "lockNoOp");
    GLOBAL_JWKS = {};
    GoTrueClient = class _GoTrueClient {
      static {
        __name(this, "_GoTrueClient");
      }
      static {
        __name2(this, "GoTrueClient");
      }
      /**
       * The JWKS used for verifying asymmetric JWTs
       */
      get jwks() {
        var _a2, _b;
        return (_b = (_a2 = GLOBAL_JWKS[this.storageKey]) === null || _a2 === void 0 ? void 0 : _a2.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
      }
      set jwks(value) {
        GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
      }
      get jwks_cached_at() {
        var _a2, _b;
        return (_b = (_a2 = GLOBAL_JWKS[this.storageKey]) === null || _a2 === void 0 ? void 0 : _a2.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
      }
      set jwks_cached_at(value) {
        GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
      }
      /**
       * Create a new client for use in the browser.
       */
      constructor(options) {
        var _a2, _b;
        this.userStorage = null;
        this.memoryStorage = null;
        this.stateChangeEmitters = /* @__PURE__ */ new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.hasCustomAuthorizationHeader = false;
        this.suppressGetSessionWarning = false;
        this.lockAcquired = false;
        this.pendingInLock = [];
        this.broadcastChannel = null;
        this.logger = console.log;
        this.instanceID = _GoTrueClient.nextInstanceID;
        _GoTrueClient.nextInstanceID += 1;
        if (this.instanceID > 0 && isBrowser()) {
          console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
        }
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.logDebugMessages = !!settings.debug;
        if (typeof settings.debug === "function") {
          this.logger = settings.debug;
        }
        this.persistSession = settings.persistSession;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.admin = new GoTrueAdminApi({
          url: settings.url,
          headers: settings.headers,
          fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = resolveFetch5(settings.fetch);
        this.lock = settings.lock || lockNoOp;
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
        if (settings.lock) {
          this.lock = settings.lock;
        } else if (isBrowser() && ((_a2 = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a2 === void 0 ? void 0 : _a2.locks)) {
          this.lock = navigatorLock;
        } else {
          this.lock = lockNoOp;
        }
        if (!this.jwks) {
          this.jwks = { keys: [] };
          this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
        }
        this.mfa = {
          verify: this._verify.bind(this),
          enroll: this._enroll.bind(this),
          unenroll: this._unenroll.bind(this),
          challenge: this._challenge.bind(this),
          listFactors: this._listFactors.bind(this),
          challengeAndVerify: this._challengeAndVerify.bind(this),
          getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
          webauthn: new WebAuthnApi(this)
        };
        this.oauth = {
          getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
          approveAuthorization: this._approveAuthorization.bind(this),
          denyAuthorization: this._denyAuthorization.bind(this)
        };
        if (this.persistSession) {
          if (settings.storage) {
            this.storage = settings.storage;
          } else {
            if (supportsLocalStorage()) {
              this.storage = globalThis.localStorage;
            } else {
              this.memoryStorage = {};
              this.storage = memoryLocalStorageAdapter(this.memoryStorage);
            }
          }
          if (settings.userStorage) {
            this.userStorage = settings.userStorage;
          }
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
        if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (e) {
            console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
          }
          (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener("message", async (event) => {
            this._debug("received broadcast notification from other tab or client", event);
            await this._notifyAllSubscribers(event.data.event, event.data.session, false);
          });
        }
        this.initialize();
      }
      _debug(...args) {
        if (this.logDebugMessages) {
          this.logger(`GoTrueClient@${this.instanceID} (${version4}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
        }
        return this;
      }
      /**
       * Initializes the client session either from the url or from storage.
       * This method is automatically called when instantiating the client, but should also be called
       * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
       */
      async initialize() {
        if (this.initializePromise) {
          return await this.initializePromise;
        }
        this.initializePromise = (async () => {
          return await this._acquireLock(-1, async () => {
            return await this._initialize();
          });
        })();
        return await this.initializePromise;
      }
      /**
       * IMPORTANT:
       * 1. Never throw in this method, as it is called from the constructor
       * 2. Never return a session from this method as it would be cached over
       *    the whole lifetime of the client
       */
      async _initialize() {
        var _a2;
        try {
          const params = parseParametersFromURL(window.location.href);
          let callbackUrlType = "none";
          if (this._isImplicitGrantCallback(params)) {
            callbackUrlType = "implicit";
          } else if (await this._isPKCECallback(params)) {
            callbackUrlType = "pkce";
          }
          if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
            const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
            if (error) {
              this._debug("#_initialize()", "error detecting session from URL", error);
              if (isAuthImplicitGrantRedirectError(error)) {
                const errorCode = (_a2 = error.details) === null || _a2 === void 0 ? void 0 : _a2.code;
                if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") {
                  return { error };
                }
              }
              await this._removeSession();
              return { error };
            }
            const { session, redirectType } = data;
            this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
            await this._saveSession(session);
            setTimeout(async () => {
              if (redirectType === "recovery") {
                await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
              } else {
                await this._notifyAllSubscribers("SIGNED_IN", session);
              }
            }, 0);
            return { error: null };
          }
          await this._recoverAndRefresh();
          return { error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { error };
          }
          return {
            error: new AuthUnknownError("Unexpected error during initialization", error)
          };
        } finally {
          await this._handleVisibilityChange();
          this._debug("#_initialize()", "end");
        }
      }
      /**
       * Creates a new anonymous user.
       *
       * @returns A session where the is_anonymous claim in the access token JWT set to true
       */
      async signInAnonymously(credentials) {
        var _a2, _b, _c;
        try {
          const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            body: {
              data: (_b = (_a2 = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a2 === void 0 ? void 0 : _a2.data) !== null && _b !== void 0 ? _b : {},
              gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
            },
            xform: _sessionResponse
          });
          const { data, error } = res;
          if (error || !data) {
            return { data: { user: null, session: null }, error };
          }
          const session = data.session;
          const user = data.user;
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Creates a new user.
       *
       * Be aware that if a user account exists in the system you may get back an
       * error message that attempts to hide this information from the user.
       * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
       *
       * @returns A logged-in session if the server has "autoconfirm" ON
       * @returns A user if the server has "autoconfirm" OFF
       */
      async signUp(credentials) {
        var _a2, _b, _c;
        try {
          let res;
          if ("email" in credentials) {
            const { email, password, options } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              ;
              [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
            }
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
              body: {
                email,
                password,
                data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              xform: _sessionResponse
            });
          } else if ("phone" in credentials) {
            const { phone, password, options } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone,
                password,
                data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              },
              xform: _sessionResponse
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data, error } = res;
          if (error || !data) {
            return { data: { user: null, session: null }, error };
          }
          const session = data.session;
          const user = data.user;
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in an existing user with an email and password or phone and password.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or that the
       * email/phone and password combination is wrong or that the account can only
       * be accessed via social login.
       */
      async signInWithPassword(credentials) {
        try {
          let res;
          if ("email" in credentials) {
            const { email, password, options } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                email,
                password,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else if ("phone" in credentials) {
            const { phone, password, options } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                phone,
                password,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data, error } = res;
          if (error) {
            return { data: { user: null, session: null }, error };
          } else if (!data || !data.session || !data.user) {
            return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return {
            data: Object.assign({ user: data.user, session: data.session }, data.weak_password ? { weakPassword: data.weak_password } : null),
            error
          };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in an existing user via a third-party provider.
       * This method supports the PKCE flow.
       */
      async signInWithOAuth(credentials) {
        var _a2, _b, _c, _d;
        return await this._handleProviderSignIn(credentials.provider, {
          redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
          scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
          skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
        });
      }
      /**
       * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
       */
      async exchangeCodeForSession(authCode) {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return this._exchangeCodeForSession(authCode);
        });
      }
      /**
       * Signs in a user by verifying a message signed by the user's private key.
       * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
       * both of which derive from the EIP-4361 standard
       * With slight variation on Solana's side.
       * @reference https://eips.ethereum.org/EIPS/eip-4361
       */
      async signInWithWeb3(credentials) {
        const { chain } = credentials;
        switch (chain) {
          case "ethereum":
            return await this.signInWithEthereum(credentials);
          case "solana":
            return await this.signInWithSolana(credentials);
          default:
            throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
        }
      }
      async signInWithEthereum(credentials) {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let message;
        let signature;
        if ("message" in credentials) {
          message = credentials.message;
          signature = credentials.signature;
        } else {
          const { chain, wallet, statement, options } = credentials;
          let resolvedWallet;
          if (!isBrowser()) {
            if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
              throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            }
            resolvedWallet = wallet;
          } else if (typeof wallet === "object") {
            resolvedWallet = wallet;
          } else {
            const windowAny = window;
            if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") {
              resolvedWallet = windowAny.ethereum;
            } else {
              throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
            }
          }
          const url = new URL((_a2 = options === null || options === void 0 ? void 0 : options.url) !== null && _a2 !== void 0 ? _a2 : window.location.href);
          const accounts = await resolvedWallet.request({
            method: "eth_requestAccounts"
          }).then((accs) => accs).catch(() => {
            throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
          });
          if (!accounts || accounts.length === 0) {
            throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
          }
          const address = getAddress(accounts[0]);
          let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
          if (!chainId) {
            const chainIdHex = await resolvedWallet.request({
              method: "eth_chainId"
            });
            chainId = fromHex(chainIdHex);
          }
          const siweMessage = {
            domain: url.host,
            address,
            statement,
            uri: url.href,
            version: "1",
            chainId,
            nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
            issuedAt: (_e = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _e !== void 0 ? _e : /* @__PURE__ */ new Date(),
            expirationTime: (_f = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _f === void 0 ? void 0 : _f.expirationTime,
            notBefore: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.notBefore,
            requestId: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.requestId,
            resources: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.resources
          };
          message = createSiweMessage(siweMessage);
          signature = await resolvedWallet.request({
            method: "personal_sign",
            params: [toHex(message), address]
          });
        }
        try {
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
            headers: this.headers,
            body: Object.assign({
              chain: "ethereum",
              message,
              signature
            }, ((_k = credentials.options) === null || _k === void 0 ? void 0 : _k.captchaToken) ? { gotrue_meta_security: { captcha_token: (_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken } } : null),
            xform: _sessionResponse
          });
          if (error) {
            throw error;
          }
          if (!data || !data.session || !data.user) {
            return {
              data: { user: null, session: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data: Object.assign({}, data), error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      async signInWithSolana(credentials) {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let message;
        let signature;
        if ("message" in credentials) {
          message = credentials.message;
          signature = credentials.signature;
        } else {
          const { chain, wallet, statement, options } = credentials;
          let resolvedWallet;
          if (!isBrowser()) {
            if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
              throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            }
            resolvedWallet = wallet;
          } else if (typeof wallet === "object") {
            resolvedWallet = wallet;
          } else {
            const windowAny = window;
            if ("solana" in windowAny && typeof windowAny.solana === "object" && ("signIn" in windowAny.solana && typeof windowAny.solana.signIn === "function" || "signMessage" in windowAny.solana && typeof windowAny.solana.signMessage === "function")) {
              resolvedWallet = windowAny.solana;
            } else {
              throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
            }
          }
          const url = new URL((_a2 = options === null || options === void 0 ? void 0 : options.url) !== null && _a2 !== void 0 ? _a2 : window.location.href);
          if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
            const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), {
              // non-overridable properties
              version: "1",
              domain: url.host,
              uri: url.href
            }), statement ? { statement } : null));
            let outputToProcess;
            if (Array.isArray(output) && output[0] && typeof output[0] === "object") {
              outputToProcess = output[0];
            } else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) {
              outputToProcess = output;
            } else {
              throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
            }
            if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
              message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
              signature = outputToProcess.signature;
            } else {
              throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            }
          } else {
            if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") {
              throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
            }
            message = [
              `${url.host} wants you to sign in with your Solana account:`,
              resolvedWallet.publicKey.toBase58(),
              ...statement ? ["", statement, ""] : [""],
              "Version: 1",
              `URI: ${url.href}`,
              `Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : (/* @__PURE__ */ new Date()).toISOString()}`,
              ...((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
              ...((_e = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _e === void 0 ? void 0 : _e.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
              ...((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
              ...((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
              ...((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
              ...((_k = (_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.resources) === null || _k === void 0 ? void 0 : _k.length) ? [
                "Resources",
                ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)
              ] : []
            ].join("\n");
            const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
            if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) {
              throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
            }
            signature = maybeSignature;
          }
        }
        try {
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
            headers: this.headers,
            body: Object.assign({ chain: "solana", message, signature: bytesToBase64URL(signature) }, ((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } } : null),
            xform: _sessionResponse
          });
          if (error) {
            throw error;
          }
          if (!data || !data.session || !data.user) {
            return {
              data: { user: null, session: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data: Object.assign({}, data), error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      async _exchangeCodeForSession(authCode) {
        const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
        try {
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
            headers: this.headers,
            body: {
              auth_code: authCode,
              code_verifier: codeVerifier
            },
            xform: _sessionResponse
          });
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          if (error) {
            throw error;
          }
          if (!data || !data.session || !data.user) {
            return {
              data: { user: null, session: null, redirectType: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null, redirectType: null }, error };
          }
          throw error;
        }
      }
      /**
       * Allows signing in with an OIDC ID token. The authentication provider used
       * should be enabled and configured.
       */
      async signInWithIdToken(credentials) {
        try {
          const { options, provider, token, access_token, nonce } = credentials;
          const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
            headers: this.headers,
            body: {
              provider,
              id_token: token,
              access_token,
              nonce,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: _sessionResponse
          });
          const { data, error } = res;
          if (error) {
            return { data: { user: null, session: null }, error };
          } else if (!data || !data.session || !data.user) {
            return {
              data: { user: null, session: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data, error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in a user using magiclink or a one-time password (OTP).
       *
       * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
       * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
       * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or, that the account
       * can only be accessed via social login.
       *
       * Do note that you will need to configure a Whatsapp sender on Twilio
       * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
       * channel is not supported on other providers
       * at this time.
       * This method supports PKCE when an email is passed.
       */
      async signInWithOtp(credentials) {
        var _a2, _b, _c, _d, _e;
        try {
          if ("email" in credentials) {
            const { email, options } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              ;
              [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
            }
            const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                email,
                data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
                create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
            });
            return { data: { user: null, session: null }, error };
          }
          if ("phone" in credentials) {
            const { phone, options } = credentials;
            const { data, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                phone,
                data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
              }
            });
            return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
       */
      async verifyOtp(params) {
        var _a2, _b;
        try {
          let redirectTo = void 0;
          let captchaToken = void 0;
          if ("options" in params) {
            redirectTo = (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo;
            captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
          }
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
            headers: this.headers,
            body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
            redirectTo,
            xform: _sessionResponse
          });
          if (error) {
            throw error;
          }
          if (!data) {
            throw new Error("An error occurred on token verification.");
          }
          const session = data.session;
          const user = data.user;
          if (session === null || session === void 0 ? void 0 : session.access_token) {
            await this._saveSession(session);
            await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Attempts a single-sign on using an enterprise Identity Provider. A
       * successful SSO attempt will redirect the current page to the identity
       * provider authorization page. The redirect URL is implementation and SSO
       * protocol specific.
       *
       * You can use it by providing a SSO domain. Typically you can extract this
       * domain by asking users for their email address. If this domain is
       * registered on the Auth instance the redirect will use that organization's
       * currently active SSO Identity Provider for the login.
       *
       * If you have built an organization-specific login page, you can use the
       * organization's SSO Identity Provider UUID directly instead.
       */
      async signInWithSSO(params) {
        var _a2, _b, _c;
        try {
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            ;
            [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
          }
          return await _request(this.fetch, "POST", `${this.url}/sso`, {
            body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
            headers: this.headers,
            xform: _ssoResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Sends a reauthentication OTP to the user's email or phone number.
       * Requires the user to be signed-in.
       */
      async reauthenticate() {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._reauthenticate();
        });
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError)
              throw sessionError;
            if (!session)
              throw new AuthSessionMissingError();
            const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
              headers: this.headers,
              jwt: session.access_token
            });
            return { data: { user: null, session: null }, error };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
       */
      async resend(credentials) {
        try {
          const endpoint = `${this.url}/resend`;
          if ("email" in credentials) {
            const { email, type, options } = credentials;
            const { error } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                email,
                type,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              },
              redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
            });
            return { data: { user: null, session: null }, error };
          } else if ("phone" in credentials) {
            const { phone, type, options } = credentials;
            const { data, error } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                phone,
                type,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              }
            });
            return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Returns the session, refreshing it if necessary.
       *
       * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
       *
       * **IMPORTANT:** This method loads values directly from the storage attached
       * to the client. If that storage is based on request cookies for example,
       * the values in it may not be authentic and therefore it's strongly advised
       * against using this method and its results in such circumstances. A warning
       * will be emitted if this is detected. Use {@link #getUser()} instead.
       */
      async getSession() {
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
          return this._useSession(async (result2) => {
            return result2;
          });
        });
        return result;
      }
      /**
       * Acquires a global lock based on the storage key.
       */
      async _acquireLock(acquireTimeout, fn) {
        this._debug("#_acquireLock", "begin", acquireTimeout);
        try {
          if (this.lockAcquired) {
            const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
            const result = (async () => {
              await last;
              return await fn();
            })();
            this.pendingInLock.push((async () => {
              try {
                await result;
              } catch (e) {
              }
            })());
            return result;
          }
          return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
            this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
            try {
              this.lockAcquired = true;
              const result = fn();
              this.pendingInLock.push((async () => {
                try {
                  await result;
                } catch (e) {
                }
              })());
              await result;
              while (this.pendingInLock.length) {
                const waitOn = [...this.pendingInLock];
                await Promise.all(waitOn);
                this.pendingInLock.splice(0, waitOn.length);
              }
              return await result;
            } finally {
              this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
              this.lockAcquired = false;
            }
          });
        } finally {
          this._debug("#_acquireLock", "end");
        }
      }
      /**
       * Use instead of {@link #getSession} inside the library. It is
       * semantically usually what you want, as getting a session involves some
       * processing afterwards that requires only one client operating on the
       * session at once across multiple tabs or processes.
       */
      async _useSession(fn) {
        this._debug("#_useSession", "begin");
        try {
          const result = await this.__loadSession();
          return await fn(result);
        } finally {
          this._debug("#_useSession", "end");
        }
      }
      /**
       * NEVER USE DIRECTLY!
       *
       * Always use {@link #_useSession}.
       */
      async __loadSession() {
        this._debug("#__loadSession()", "begin");
        if (!this.lockAcquired) {
          this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
        }
        try {
          let currentSession = null;
          const maybeSession = await getItemAsync(this.storage, this.storageKey);
          this._debug("#getSession()", "session from storage", maybeSession);
          if (maybeSession !== null) {
            if (this._isValidSession(maybeSession)) {
              currentSession = maybeSession;
            } else {
              this._debug("#getSession()", "session from storage is not valid");
              await this._removeSession();
            }
          }
          if (!currentSession) {
            return { data: { session: null }, error: null };
          }
          const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS : false;
          this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
          if (!hasExpired) {
            if (this.userStorage) {
              const maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
              if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) {
                currentSession.user = maybeUser.user;
              } else {
                currentSession.user = userNotAvailableProxy();
              }
            }
            if (this.storage.isServer && currentSession.user && !currentSession.user.__isUserNotAvailableProxy) {
              const suppressWarningRef = { value: this.suppressGetSessionWarning };
              currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef);
              if (suppressWarningRef.value) {
                this.suppressGetSessionWarning = true;
              }
            }
            return { data: { session: currentSession }, error: null };
          }
          const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            return { data: { session: null }, error };
          }
          return { data: { session }, error: null };
        } finally {
          this._debug("#__loadSession()", "end");
        }
      }
      /**
       * Gets the current user details if there is an existing session. This method
       * performs a network request to the Supabase Auth server, so the returned
       * value is authentic and can be used to base authorization rules on.
       *
       * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
       */
      async getUser(jwt) {
        if (jwt) {
          return await this._getUser(jwt);
        }
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
          return await this._getUser();
        });
        return result;
      }
      async _getUser(jwt) {
        try {
          if (jwt) {
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt,
              xform: _userResponse
            });
          }
          return await this._useSession(async (result) => {
            var _a2, _b, _c;
            const { data, error } = result;
            if (error) {
              throw error;
            }
            if (!((_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) && !this.hasCustomAuthorizationHeader) {
              return { data: { user: null }, error: new AuthSessionMissingError() };
            }
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
              xform: _userResponse
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            if (isAuthSessionMissingError(error)) {
              await this._removeSession();
              await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            }
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Updates user data for a logged in user.
       */
      async updateUser(attributes, options = {}) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._updateUser(attributes, options);
        });
      }
      async _updateUser(attributes, options = {}) {
        try {
          return await this._useSession(async (result) => {
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              throw sessionError;
            }
            if (!sessionData.session) {
              throw new AuthSessionMissingError();
            }
            const session = sessionData.session;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce" && attributes.email != null) {
              ;
              [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
            }
            const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
              body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
              jwt: session.access_token,
              xform: _userResponse
            });
            if (userError)
              throw userError;
            session.user = data.user;
            await this._saveSession(session);
            await this._notifyAllSubscribers("USER_UPDATED", session);
            return { data: { user: session.user }, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
       * If the refresh token or access token in the current session is invalid, an error will be thrown.
       * @param currentSession The current session that minimally contains an access token and refresh token.
       */
      async setSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._setSession(currentSession);
        });
      }
      async _setSession(currentSession) {
        try {
          if (!currentSession.access_token || !currentSession.refresh_token) {
            throw new AuthSessionMissingError();
          }
          const timeNow = Date.now() / 1e3;
          let expiresAt2 = timeNow;
          let hasExpired = true;
          let session = null;
          const { payload } = decodeJWT(currentSession.access_token);
          if (payload.exp) {
            expiresAt2 = payload.exp;
            hasExpired = expiresAt2 <= timeNow;
          }
          if (hasExpired) {
            const { data: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              return { data: { user: null, session: null }, error };
            }
            if (!refreshedSession) {
              return { data: { user: null, session: null }, error: null };
            }
            session = refreshedSession;
          } else {
            const { data, error } = await this._getUser(currentSession.access_token);
            if (error) {
              throw error;
            }
            session = {
              access_token: currentSession.access_token,
              refresh_token: currentSession.refresh_token,
              user: data.user,
              token_type: "bearer",
              expires_in: expiresAt2 - timeNow,
              expires_at: expiresAt2
            };
            await this._saveSession(session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user: session.user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { session: null, user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Returns a new session, regardless of expiry status.
       * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
       * If the current session's refresh token is invalid, an error will be thrown.
       * @param currentSession The current session. If passed in, it must contain a refresh token.
       */
      async refreshSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._refreshSession(currentSession);
        });
      }
      async _refreshSession(currentSession) {
        try {
          return await this._useSession(async (result) => {
            var _a2;
            if (!currentSession) {
              const { data, error: error2 } = result;
              if (error2) {
                throw error2;
              }
              currentSession = (_a2 = data.session) !== null && _a2 !== void 0 ? _a2 : void 0;
            }
            if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
              throw new AuthSessionMissingError();
            }
            const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              return { data: { user: null, session: null }, error };
            }
            if (!session) {
              return { data: { user: null, session: null }, error: null };
            }
            return { data: { user: session.user, session }, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Gets the session data from a URL string
       */
      async _getSessionFromURL(params, callbackUrlType) {
        try {
          if (!isBrowser())
            throw new AuthImplicitGrantRedirectError("No browser detected.");
          if (params.error || params.error_description || params.error_code) {
            throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
              error: params.error || "unspecified_error",
              code: params.error_code || "unspecified_code"
            });
          }
          switch (callbackUrlType) {
            case "implicit":
              if (this.flowType === "pkce") {
                throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
              }
              break;
            case "pkce":
              if (this.flowType === "implicit") {
                throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
              }
              break;
            default:
          }
          if (callbackUrlType === "pkce") {
            this._debug("#_initialize()", "begin", "is PKCE flow", true);
            if (!params.code)
              throw new AuthPKCEGrantCodeExchangeError("No code detected.");
            const { data: data2, error: error2 } = await this._exchangeCodeForSession(params.code);
            if (error2)
              throw error2;
            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            window.history.replaceState(window.history.state, "", url.toString());
            return { data: { session: data2.session, redirectType: null }, error: null };
          }
          const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
          if (!access_token || !expires_in || !refresh_token || !token_type) {
            throw new AuthImplicitGrantRedirectError("No session defined in URL");
          }
          const timeNow = Math.round(Date.now() / 1e3);
          const expiresIn = parseInt(expires_in);
          let expiresAt2 = timeNow + expiresIn;
          if (expires_at) {
            expiresAt2 = parseInt(expires_at);
          }
          const actuallyExpiresIn = expiresAt2 - timeNow;
          if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS) {
            console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
          }
          const issuedAt = expiresAt2 - expiresIn;
          if (timeNow - issuedAt >= 120) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
          } else if (timeNow - issuedAt < 0) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt2, timeNow);
          }
          const { data, error } = await this._getUser(access_token);
          if (error)
            throw error;
          const session = {
            provider_token,
            provider_refresh_token,
            access_token,
            expires_in: expiresIn,
            expires_at: expiresAt2,
            refresh_token,
            token_type,
            user: data.user
          };
          window.location.hash = "";
          this._debug("#_getSessionFromURL()", "clearing window.location.hash");
          return { data: { session, redirectType: params.type }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { session: null, redirectType: null }, error };
          }
          throw error;
        }
      }
      /**
       * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
       */
      _isImplicitGrantCallback(params) {
        return Boolean(params.access_token || params.error_description);
      }
      /**
       * Checks if the current URL and backing storage contain parameters given by a PKCE flow
       */
      async _isPKCECallback(params) {
        const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        return !!(params.code && currentStorageContent);
      }
      /**
       * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
       *
       * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
       * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
       *
       * If using `others` scope, no `SIGNED_OUT` event is fired!
       */
      async signOut(options = { scope: "global" }) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._signOut(options);
        });
      }
      async _signOut({ scope } = { scope: "global" }) {
        return await this._useSession(async (result) => {
          var _a2;
          const { data, error: sessionError } = result;
          if (sessionError) {
            return { error: sessionError };
          }
          const accessToken = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token;
          if (accessToken) {
            const { error } = await this.admin.signOut(accessToken, scope);
            if (error) {
              if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403))) {
                return { error };
              }
            }
          }
          if (scope !== "others") {
            await this._removeSession();
            await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          }
          return { error: null };
        });
      }
      onAuthStateChange(callback) {
        const id = uuid();
        const subscription = {
          id,
          callback,
          unsubscribe: /* @__PURE__ */ __name2(() => {
            this._debug("#unsubscribe()", "state change callback with id removed", id);
            this.stateChangeEmitters.delete(id);
          }, "unsubscribe")
        };
        this._debug("#onAuthStateChange()", "registered callback with id", id);
        this.stateChangeEmitters.set(id, subscription);
        (async () => {
          await this.initializePromise;
          await this._acquireLock(-1, async () => {
            this._emitInitialSession(id);
          });
        })();
        return { data: { subscription } };
      }
      async _emitInitialSession(id) {
        return await this._useSession(async (result) => {
          var _a2, _b;
          try {
            const { data: { session }, error } = result;
            if (error)
              throw error;
            await ((_a2 = this.stateChangeEmitters.get(id)) === null || _a2 === void 0 ? void 0 : _a2.callback("INITIAL_SESSION", session));
            this._debug("INITIAL_SESSION", "callback id", id, "session", session);
          } catch (err) {
            await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
            this._debug("INITIAL_SESSION", "callback id", id, "error", err);
            console.error(err);
          }
        });
      }
      /**
       * Sends a password reset request to an email address. This method supports the PKCE flow.
       *
       * @param email The email address of the user.
       * @param options.redirectTo The URL to send the user to after they click the password reset link.
       * @param options.captchaToken Verification token received when the user completes the captcha on the site.
       */
      async resetPasswordForEmail(email, options = {}) {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
            this.storage,
            this.storageKey,
            true
            // isPasswordRecovery
          );
        }
        try {
          return await _request(this.fetch, "POST", `${this.url}/recover`, {
            body: {
              email,
              code_challenge: codeChallenge,
              code_challenge_method: codeChallengeMethod,
              gotrue_meta_security: { captcha_token: options.captchaToken }
            },
            headers: this.headers,
            redirectTo: options.redirectTo
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Gets all the identities linked to a user.
       */
      async getUserIdentities() {
        var _a2;
        try {
          const { data, error } = await this.getUser();
          if (error)
            throw error;
          return { data: { identities: (_a2 = data.user.identities) !== null && _a2 !== void 0 ? _a2 : [] }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async linkIdentity(credentials) {
        if ("token" in credentials) {
          return this.linkIdentityIdToken(credentials);
        }
        return this.linkIdentityOAuth(credentials);
      }
      async linkIdentityOAuth(credentials) {
        var _a2;
        try {
          const { data, error } = await this._useSession(async (result) => {
            var _a3, _b, _c, _d, _e;
            const { data: data2, error: error2 } = result;
            if (error2)
              throw error2;
            const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
              redirectTo: (_a3 = credentials.options) === null || _a3 === void 0 ? void 0 : _a3.redirectTo,
              scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
              queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
              skipBrowserRedirect: true
            });
            return await _request(this.fetch, "GET", url, {
              headers: this.headers,
              jwt: (_e = (_d = data2.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
            });
          });
          if (error)
            throw error;
          if (isBrowser() && !((_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.skipBrowserRedirect)) {
            window.location.assign(data === null || data === void 0 ? void 0 : data.url);
          }
          return { data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { provider: credentials.provider, url: null }, error };
          }
          throw error;
        }
      }
      async linkIdentityIdToken(credentials) {
        return await this._useSession(async (result) => {
          var _a2;
          try {
            const { error: sessionError, data: { session } } = result;
            if (sessionError)
              throw sessionError;
            const { options, provider, token, access_token, nonce } = credentials;
            const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
              headers: this.headers,
              jwt: (_a2 = session === null || session === void 0 ? void 0 : session.access_token) !== null && _a2 !== void 0 ? _a2 : void 0,
              body: {
                provider,
                id_token: token,
                access_token,
                nonce,
                link_identity: true,
                gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
              },
              xform: _sessionResponse
            });
            const { data, error } = res;
            if (error) {
              return { data: { user: null, session: null }, error };
            } else if (!data || !data.session || !data.user) {
              return {
                data: { user: null, session: null },
                error: new AuthInvalidTokenResponseError()
              };
            }
            if (data.session) {
              await this._saveSession(data.session);
              await this._notifyAllSubscribers("USER_UPDATED", data.session);
            }
            return { data, error };
          } catch (error) {
            if (isAuthError(error)) {
              return { data: { user: null, session: null }, error };
            }
            throw error;
          }
        });
      }
      /**
       * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
       */
      async unlinkIdentity(identity) {
        try {
          return await this._useSession(async (result) => {
            var _a2, _b;
            const { data, error } = result;
            if (error) {
              throw error;
            }
            return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
              headers: this.headers,
              jwt: (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : void 0
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Generates a new JWT.
       * @param refreshToken A valid refresh token that was returned on login.
       */
      async _refreshAccessToken(refreshToken) {
        const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          const startedAt = Date.now();
          return await retryable(async (attempt) => {
            if (attempt > 0) {
              await sleep(200 * Math.pow(2, attempt - 1));
            }
            this._debug(debugName, "refreshing attempt", attempt);
            return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
              body: { refresh_token: refreshToken },
              headers: this.headers,
              xform: _sessionResponse
            });
          }, (attempt, error) => {
            const nextBackOffInterval = 200 * Math.pow(2, attempt);
            return error && isAuthRetryableFetchError(error) && // retryable only if the request can be sent before the backoff overflows the tick duration
            Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS;
          });
        } catch (error) {
          this._debug(debugName, "error", error);
          if (isAuthError(error)) {
            return { data: { session: null, user: null }, error };
          }
          throw error;
        } finally {
          this._debug(debugName, "end");
        }
      }
      _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
      }
      async _handleProviderSignIn(provider, options) {
        const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
          redirectTo: options.redirectTo,
          scopes: options.scopes,
          queryParams: options.queryParams
        });
        this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
        if (isBrowser() && !options.skipBrowserRedirect) {
          window.location.assign(url);
        }
        return { data: { provider, url }, error: null };
      }
      /**
       * Recovers the session from LocalStorage and refreshes the token
       * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
       */
      async _recoverAndRefresh() {
        var _a2, _b;
        const debugName = "#_recoverAndRefresh()";
        this._debug(debugName, "begin");
        try {
          const currentSession = await getItemAsync(this.storage, this.storageKey);
          if (currentSession && this.userStorage) {
            let maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
            if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
              maybeUser = { user: currentSession.user };
              await setItemAsync(this.userStorage, this.storageKey + "-user", maybeUser);
            }
            currentSession.user = (_a2 = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a2 !== void 0 ? _a2 : userNotAvailableProxy();
          } else if (currentSession && !currentSession.user) {
            if (!currentSession.user) {
              const separateUser = await getItemAsync(this.storage, this.storageKey + "-user");
              if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
                currentSession.user = separateUser.user;
                await removeItemAsync(this.storage, this.storageKey + "-user");
                await setItemAsync(this.storage, this.storageKey, currentSession);
              } else {
                currentSession.user = userNotAvailableProxy();
              }
            }
          }
          this._debug(debugName, "session from storage", currentSession);
          if (!this._isValidSession(currentSession)) {
            this._debug(debugName, "session is not valid");
            if (currentSession !== null) {
              await this._removeSession();
            }
            return;
          }
          const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
          this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`);
          if (expiresWithMargin) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const { error } = await this._callRefreshToken(currentSession.refresh_token);
              if (error) {
                console.error(error);
                if (!isAuthRetryableFetchError(error)) {
                  this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
                  await this._removeSession();
                }
              }
            }
          } else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) {
            try {
              const { data, error: userError } = await this._getUser(currentSession.access_token);
              if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
                currentSession.user = data.user;
                await this._saveSession(currentSession);
                await this._notifyAllSubscribers("SIGNED_IN", currentSession);
              } else {
                this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
              }
            } catch (getUserError) {
              console.error("Error getting user data:", getUserError);
              this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
            }
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          }
        } catch (err) {
          this._debug(debugName, "error", err);
          console.error(err);
          return;
        } finally {
          this._debug(debugName, "end");
        }
      }
      async _callRefreshToken(refreshToken) {
        var _a2, _b;
        if (!refreshToken) {
          throw new AuthSessionMissingError();
        }
        if (this.refreshingDeferred) {
          return this.refreshingDeferred.promise;
        }
        const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          this.refreshingDeferred = new Deferred();
          const { data, error } = await this._refreshAccessToken(refreshToken);
          if (error)
            throw error;
          if (!data.session)
            throw new AuthSessionMissingError();
          await this._saveSession(data.session);
          await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
          const result = { data: data.session, error: null };
          this.refreshingDeferred.resolve(result);
          return result;
        } catch (error) {
          this._debug(debugName, "error", error);
          if (isAuthError(error)) {
            const result = { data: null, error };
            if (!isAuthRetryableFetchError(error)) {
              await this._removeSession();
            }
            (_a2 = this.refreshingDeferred) === null || _a2 === void 0 ? void 0 : _a2.resolve(result);
            return result;
          }
          (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
          throw error;
        } finally {
          this.refreshingDeferred = null;
          this._debug(debugName, "end");
        }
      }
      async _notifyAllSubscribers(event, session, broadcast = true) {
        const debugName = `#_notifyAllSubscribers(${event})`;
        this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
        try {
          if (this.broadcastChannel && broadcast) {
            this.broadcastChannel.postMessage({ event, session });
          }
          const errors = [];
          const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
            try {
              await x.callback(event, session);
            } catch (e) {
              errors.push(e);
            }
          });
          await Promise.all(promises);
          if (errors.length > 0) {
            for (let i = 0; i < errors.length; i += 1) {
              console.error(errors[i]);
            }
            throw errors[0];
          }
        } finally {
          this._debug(debugName, "end");
        }
      }
      /**
       * set currentSession and currentUser
       * process to _startAutoRefreshToken if possible
       */
      async _saveSession(session) {
        this._debug("#_saveSession()", session);
        this.suppressGetSessionWarning = true;
        const sessionToProcess = Object.assign({}, session);
        const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
        if (this.userStorage) {
          if (!userIsProxy && sessionToProcess.user) {
            await setItemAsync(this.userStorage, this.storageKey + "-user", {
              user: sessionToProcess.user
            });
          } else if (userIsProxy) {
          }
          const mainSessionData = Object.assign({}, sessionToProcess);
          delete mainSessionData.user;
          const clonedMainSessionData = deepClone(mainSessionData);
          await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
        } else {
          const clonedSession = deepClone(sessionToProcess);
          await setItemAsync(this.storage, this.storageKey, clonedSession);
        }
      }
      async _removeSession() {
        this._debug("#_removeSession()");
        await removeItemAsync(this.storage, this.storageKey);
        await removeItemAsync(this.storage, this.storageKey + "-code-verifier");
        await removeItemAsync(this.storage, this.storageKey + "-user");
        if (this.userStorage) {
          await removeItemAsync(this.userStorage, this.storageKey + "-user");
        }
        await this._notifyAllSubscribers("SIGNED_OUT", null);
      }
      /**
       * Removes any registered visibilitychange callback.
       *
       * {@see #startAutoRefresh}
       * {@see #stopAutoRefresh}
       */
      _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
            window.removeEventListener("visibilitychange", callback);
          }
        } catch (e) {
          console.error("removing visibilitychange callback failed", e);
        }
      }
      /**
       * This is the private implementation of {@link #startAutoRefresh}. Use this
       * within the library.
       */
      async _startAutoRefresh() {
        await this._stopAutoRefresh();
        this._debug("#_startAutoRefresh()");
        const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
        this.autoRefreshTicker = ticker;
        if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
          ticker.unref();
        } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
          Deno.unrefTimer(ticker);
        }
        setTimeout(async () => {
          await this.initializePromise;
          await this._autoRefreshTokenTick();
        }, 0);
      }
      /**
       * This is the private implementation of {@link #stopAutoRefresh}. Use this
       * within the library.
       */
      async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        const ticker = this.autoRefreshTicker;
        this.autoRefreshTicker = null;
        if (ticker) {
          clearInterval(ticker);
        }
      }
      /**
       * Starts an auto-refresh process in the background. The session is checked
       * every few seconds. Close to the time of expiration a process is started to
       * refresh the session. If refreshing fails it will be retried for as long as
       * necessary.
       *
       * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
       * to call this function, it will be called for you.
       *
       * On browsers the refresh process works only when the tab/window is in the
       * foreground to conserve resources as well as prevent race conditions and
       * flooding auth with requests. If you call this method any managed
       * visibility change callback will be removed and you must manage visibility
       * changes on your own.
       *
       * On non-browser platforms the refresh process works *continuously* in the
       * background, which may not be desirable. You should hook into your
       * platform's foreground indication mechanism and call these methods
       * appropriately to conserve resources.
       *
       * {@see #stopAutoRefresh}
       */
      async startAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._startAutoRefresh();
      }
      /**
       * Stops an active auto refresh process running in the background (if any).
       *
       * If you call this method any managed visibility change callback will be
       * removed and you must manage visibility changes on your own.
       *
       * See {@link #startAutoRefresh} for more details.
       */
      async stopAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._stopAutoRefresh();
      }
      /**
       * Runs the auto refresh token tick.
       */
      async _autoRefreshTokenTick() {
        this._debug("#_autoRefreshTokenTick()", "begin");
        try {
          await this._acquireLock(0, async () => {
            try {
              const now = Date.now();
              try {
                return await this._useSession(async (result) => {
                  const { data: { session } } = result;
                  if (!session || !session.refresh_token || !session.expires_at) {
                    this._debug("#_autoRefreshTokenTick()", "no session");
                    return;
                  }
                  const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION_MS);
                  this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                  if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                    await this._callRefreshToken(session.refresh_token);
                  }
                });
              } catch (e) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
              }
            } finally {
              this._debug("#_autoRefreshTokenTick()", "end");
            }
          });
        } catch (e) {
          if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
            this._debug("auto refresh token tick lock not available");
          } else {
            throw e;
          }
        }
      }
      /**
       * Registers callbacks on the browser / platform, which in-turn run
       * algorithms when the browser window/tab are in foreground. On non-browser
       * platforms it assumes always foreground.
       */
      async _handleVisibilityChange() {
        this._debug("#_handleVisibilityChange()");
        if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
          if (this.autoRefreshToken) {
            this.startAutoRefresh();
          }
          return false;
        }
        try {
          this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
          window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
          await this._onVisibilityChanged(true);
        } catch (error) {
          console.error("_handleVisibilityChange", error);
        }
      }
      /**
       * Callback registered with `window.addEventListener('visibilitychange')`.
       */
      async _onVisibilityChanged(calledFromInitialize) {
        const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
        this._debug(methodName, "visibilityState", document.visibilityState);
        if (document.visibilityState === "visible") {
          if (this.autoRefreshToken) {
            this._startAutoRefresh();
          }
          if (!calledFromInitialize) {
            await this.initializePromise;
            await this._acquireLock(-1, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                return;
              }
              await this._recoverAndRefresh();
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (this.autoRefreshToken) {
            this._stopAutoRefresh();
          }
        }
      }
      /**
       * Generates the relevant login URL for a third-party provider.
       * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
       * @param options.scopes A space-separated list of scopes granted to the OAuth application.
       * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
       */
      async _getUrlForProvider(url, provider, options) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
          urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
          urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        if (this.flowType === "pkce") {
          const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
          const flowParams = new URLSearchParams({
            code_challenge: `${encodeURIComponent(codeChallenge)}`,
            code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
          });
          urlParams.push(flowParams.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.queryParams) {
          const query = new URLSearchParams(options.queryParams);
          urlParams.push(query.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
          urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
        }
        return `${url}?${urlParams.join("&")}`;
      }
      async _unenroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a2;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
              headers: this.headers,
              jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async _enroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a2, _b;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, params.factorType === "phone" ? { phone: params.phone } : params.factorType === "totp" ? { issuer: params.issuer } : {});
            const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
              body,
              headers: this.headers,
              jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
            });
            if (error) {
              return { data: null, error };
            }
            if (params.factorType === "totp" && data.type === "totp" && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
              data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
            }
            return { data, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async _verify(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a2;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              const body = Object.assign({ challenge_id: params.challengeId }, "webauthn" in params ? {
                webauthn: Object.assign(Object.assign({}, params.webauthn), { credential_response: params.webauthn.type === "create" ? serializeCredentialCreationResponse(params.webauthn.credential_response) : serializeCredentialRequestResponse(params.webauthn.credential_response) })
              } : { code: params.code });
              const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
                body,
                headers: this.headers,
                jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
              });
              if (error) {
                return { data: null, error };
              }
              await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
              return { data, error };
            });
          } catch (error) {
            if (isAuthError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      async _challenge(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a2;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              const response = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
                body: params,
                headers: this.headers,
                jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
              });
              if (response.error) {
                return response;
              }
              const { data } = response;
              if (data.type !== "webauthn") {
                return { data, error: null };
              }
              switch (data.webauthn.type) {
                case "create":
                  return {
                    data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialCreationOptions(data.webauthn.credential_options.publicKey) }) }) }),
                    error: null
                  };
                case "request":
                  return {
                    data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialRequestOptions(data.webauthn.credential_options.publicKey) }) }) }),
                    error: null
                  };
              }
            });
          } catch (error) {
            if (isAuthError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challengeAndVerify}
       */
      async _challengeAndVerify(params) {
        const { data: challengeData, error: challengeError } = await this._challenge({
          factorId: params.factorId
        });
        if (challengeError) {
          return { data: null, error: challengeError };
        }
        return await this._verify({
          factorId: params.factorId,
          challengeId: challengeData.id,
          code: params.code
        });
      }
      /**
       * {@see GoTrueMFAApi#listFactors}
       */
      async _listFactors() {
        var _a2;
        const { data: { user }, error: userError } = await this.getUser();
        if (userError) {
          return { data: null, error: userError };
        }
        const data = {
          all: [],
          phone: [],
          totp: [],
          webauthn: []
        };
        for (const factor of (_a2 = user === null || user === void 0 ? void 0 : user.factors) !== null && _a2 !== void 0 ? _a2 : []) {
          data.all.push(factor);
          if (factor.status === "verified") {
            ;
            data[factor.factor_type].push(factor);
          }
        }
        return {
          data,
          error: null
        };
      }
      /**
       * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
       */
      async _getAuthenticatorAssuranceLevel() {
        var _a2, _b;
        const { data: { session }, error: sessionError } = await this.getSession();
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        if (!session) {
          return {
            data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
            error: null
          };
        }
        const { payload } = decodeJWT(session.access_token);
        let currentLevel = null;
        if (payload.aal) {
          currentLevel = payload.aal;
        }
        let nextLevel = currentLevel;
        const verifiedFactors = (_b = (_a2 = session.user.factors) === null || _a2 === void 0 ? void 0 : _a2.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
        if (verifiedFactors.length > 0) {
          nextLevel = "aal2";
        }
        const currentAuthenticationMethods = payload.amr || [];
        return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
      }
      /**
       * Retrieves details about an OAuth authorization request.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       *
       * Returns authorization details including client info, scopes, and user information.
       * If the API returns a redirect_uri, it means consent was already given - the caller
       * should handle the redirect manually if needed.
       */
      async _getAuthorizationDetails(authorizationId) {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            if (!session) {
              return { data: null, error: new AuthSessionMissingError() };
            }
            return await _request(this.fetch, "GET", `${this.url}/oauth/authorizations/${authorizationId}`, {
              headers: this.headers,
              jwt: session.access_token,
              xform: /* @__PURE__ */ __name2((data) => ({ data, error: null }), "xform")
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Approves an OAuth authorization request.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       */
      async _approveAuthorization(authorizationId, options) {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            if (!session) {
              return { data: null, error: new AuthSessionMissingError() };
            }
            const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
              headers: this.headers,
              jwt: session.access_token,
              body: { action: "approve" },
              xform: /* @__PURE__ */ __name2((data) => ({ data, error: null }), "xform")
            });
            if (response.data && response.data.redirect_url) {
              if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) {
                window.location.assign(response.data.redirect_url);
              }
            }
            return response;
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Denies an OAuth authorization request.
       * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
       */
      async _denyAuthorization(authorizationId, options) {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            if (!session) {
              return { data: null, error: new AuthSessionMissingError() };
            }
            const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
              headers: this.headers,
              jwt: session.access_token,
              body: { action: "deny" },
              xform: /* @__PURE__ */ __name2((data) => ({ data, error: null }), "xform")
            });
            if (response.data && response.data.redirect_url) {
              if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) {
                window.location.assign(response.data.redirect_url);
              }
            }
            return response;
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async fetchJwk(kid, jwks = { keys: [] }) {
        let jwk = jwks.keys.find((key) => key.kid === kid);
        if (jwk) {
          return jwk;
        }
        const now = Date.now();
        jwk = this.jwks.keys.find((key) => key.kid === kid);
        if (jwk && this.jwks_cached_at + JWKS_TTL > now) {
          return jwk;
        }
        const { data, error } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
          headers: this.headers
        });
        if (error) {
          throw error;
        }
        if (!data.keys || data.keys.length === 0) {
          return null;
        }
        this.jwks = data;
        this.jwks_cached_at = now;
        jwk = data.keys.find((key) => key.kid === kid);
        if (!jwk) {
          return null;
        }
        return jwk;
      }
      /**
       * Extracts the JWT claims present in the access token by first verifying the
       * JWT against the server's JSON Web Key Set endpoint
       * `/.well-known/jwks.json` which is often cached, resulting in significantly
       * faster responses. Prefer this method over {@link #getUser} which always
       * sends a request to the Auth server for each JWT.
       *
       * If the project is not using an asymmetric JWT signing key (like ECC or
       * RSA) it always sends a request to the Auth server (similar to {@link
       * #getUser}) to verify the JWT.
       *
       * @param jwt An optional specific JWT you wish to verify, not the one you
       *            can obtain from {@link #getSession}.
       * @param options Various additional options that allow you to customize the
       *                behavior of this method.
       */
      async getClaims(jwt, options = {}) {
        try {
          let token = jwt;
          if (!token) {
            const { data, error } = await this.getSession();
            if (error || !data.session) {
              return { data: null, error };
            }
            token = data.session.access_token;
          }
          const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = decodeJWT(token);
          if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) {
            validateExp(payload.exp);
          }
          const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
          if (!signingKey) {
            const { error } = await this.getUser(token);
            if (error) {
              throw error;
            }
            return {
              data: {
                claims: payload,
                header,
                signature
              },
              error: null
            };
          }
          const algorithm = getAlgorithm(header.alg);
          const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, [
            "verify"
          ]);
          const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`));
          if (!isValid) {
            throw new AuthInvalidJwtError("Invalid JWT signature");
          }
          return {
            data: {
              claims: payload,
              header,
              signature
            },
            error: null
          };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
    };
    GoTrueClient.nextInstanceID = 0;
    GoTrueClient_default = GoTrueClient;
  }
});
var init_AuthAdminApi = __esm({
  "node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_GoTrueAdminApi();
  }
});
var AuthClient;
var AuthClient_default;
var init_AuthClient = __esm({
  "node_modules/@supabase/auth-js/dist/module/AuthClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_GoTrueClient();
    AuthClient = GoTrueClient_default;
    AuthClient_default = AuthClient;
  }
});
var init_module4 = __esm({
  "node_modules/@supabase/auth-js/dist/module/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_GoTrueAdminApi();
    init_GoTrueClient();
    init_AuthAdminApi();
    init_AuthClient();
    init_types3();
    init_errors3();
    init_locks();
  }
});
var SupabaseAuthClient;
var init_SupabaseAuthClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module4();
    SupabaseAuthClient = class extends AuthClient_default {
      static {
        __name(this, "SupabaseAuthClient");
      }
      static {
        __name2(this, "SupabaseAuthClient");
      }
      constructor(options) {
        super(options);
      }
    };
  }
});
var SupabaseClient;
var init_SupabaseClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module();
    init_wrapper();
    init_module2();
    init_module3();
    init_constants4();
    init_fetch3();
    init_helpers3();
    init_SupabaseAuthClient();
    SupabaseClient = class {
      static {
        __name(this, "SupabaseClient");
      }
      static {
        __name2(this, "SupabaseClient");
      }
      /**
       * Create a new client for use in the browser.
       * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
       * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
       * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
       * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
       * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
       * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
       * @param options.realtime Options passed along to realtime-js constructor.
       * @param options.storage Options passed along to the storage-js constructor.
       * @param options.global.fetch A custom fetch implementation.
       * @param options.global.headers Any additional headers to send with each network request.
       */
      constructor(supabaseUrl, supabaseKey, options) {
        var _a2, _b, _c;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        const baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey)
          throw new Error("supabaseKey is required.");
        this.realtimeUrl = new URL("realtime/v1", baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
        this.authUrl = new URL("auth/v1", baseUrl);
        this.storageUrl = new URL("storage/v1", baseUrl);
        this.functionsUrl = new URL("functions/v1", baseUrl);
        const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
          db: DEFAULT_DB_OPTIONS,
          realtime: DEFAULT_REALTIME_OPTIONS,
          auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
          global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_a2 = settings.auth.storageKey) !== null && _a2 !== void 0 ? _a2 : "";
        this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
        if (!settings.accessToken) {
          this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
        } else {
          this.accessToken = settings.accessToken;
          this.auth = new Proxy({}, {
            get: /* @__PURE__ */ __name2((_, prop) => {
              throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
            }, "get")
          });
        }
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, settings.realtime));
        this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
          headers: this.headers,
          schema: settings.db.schema,
          fetch: this.fetch
        });
        this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) {
          this._listenForAuthEvents();
        }
      }
      /**
       * Supabase Functions allows you to deploy and invoke edge functions.
       */
      get functions() {
        return new FunctionsClient(this.functionsUrl.href, {
          headers: this.headers,
          customFetch: this.fetch
        });
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        return this.rest.from(relation);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.schema
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return this.rest.schema(schema);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.rpc
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.get - When set to `true`, the function will be called with
       * read-only access mode.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, options = {
        head: false,
        get: false,
        count: void 0
      }) {
        return this.rest.rpc(fn, args, options);
      }
      /**
       * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
       *
       * @param {string} name - The name of the Realtime channel.
       * @param {Object} opts - The options to pass to the Realtime channel.
       *
       */
      channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
      }
      /**
       * Returns all Realtime channels.
       */
      getChannels() {
        return this.realtime.getChannels();
      }
      /**
       * Unsubscribes and removes Realtime channel from Realtime client.
       *
       * @param {RealtimeChannel} channel - The name of the Realtime channel.
       *
       */
      removeChannel(channel) {
        return this.realtime.removeChannel(channel);
      }
      /**
       * Unsubscribes and removes all Realtime channels from Realtime client.
       */
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      async _getAccessToken() {
        var _a2, _b;
        if (this.accessToken) {
          return await this.accessToken();
        }
        const { data } = await this.auth.getSession();
        return (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
      }
      _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug }, headers, fetch3) {
        const authHeaders = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
          url: this.authUrl.href,
          headers: Object.assign(Object.assign({}, authHeaders), headers),
          storageKey,
          autoRefreshToken,
          persistSession,
          detectSessionInUrl,
          storage,
          userStorage,
          flowType,
          lock,
          debug,
          fetch: fetch3,
          // auth checks if there is a custom authorizaiton header using this flag
          // so it knows whether to return an error when getUser is called with no session
          hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
        });
      }
      _initRealtimeClient(options) {
        return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
      }
      _listenForAuthEvents() {
        const data = this.auth.onAuthStateChange((event, session) => {
          this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
        return data;
      }
      _handleTokenChanged(event, source, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
          this.changedAccessToken = token;
          this.realtime.setAuth(token);
        } else if (event === "SIGNED_OUT") {
          this.realtime.setAuth();
          if (source == "STORAGE")
            this.auth.signOut();
          this.changedAccessToken = void 0;
        }
      }
    };
  }
});
function shouldShowDeprecationWarning() {
  if (typeof window !== "undefined") {
    return false;
  }
  if (typeof process === "undefined") {
    return false;
  }
  const processVersion = process["version"];
  if (processVersion === void 0 || processVersion === null) {
    return false;
  }
  const versionMatch = processVersion.match(/^v(\d+)\./);
  if (!versionMatch) {
    return false;
  }
  const majorVersion = parseInt(versionMatch[1], 10);
  return majorVersion <= 18;
}
__name(shouldShowDeprecationWarning, "shouldShowDeprecationWarning");
var createClient;
var init_module5 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_SupabaseClient();
    init_module4();
    init_wrapper();
    init_module2();
    createClient = /* @__PURE__ */ __name2((supabaseUrl, supabaseKey, options) => {
      return new SupabaseClient(supabaseUrl, supabaseKey, options);
    }, "createClient");
    __name2(shouldShowDeprecationWarning, "shouldShowDeprecationWarning");
    if (shouldShowDeprecationWarning()) {
      console.warn(`\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);
    }
  }
});
async function onRequest(context) {
  const { request, env, params } = context;
  const { type } = params;
  const url = new URL(request.url);
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    if (type === "summary") {
      const farmId = url.searchParams.get("farm_id");
      if (!farmId) {
        return new Response(JSON.stringify({ error: "farm_id query parameter required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: farmAccess, error: accessError } = await dbClient.from("farm_members").select("id").eq("farm_id", farmId).eq("user_id", user.id).single();
      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const startDate = url.searchParams.get("start_date") || "2024-01-01";
      const endDate = url.searchParams.get("end_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const { data: entries, error: entriesError } = await dbClient.from("finance_entries").select("*").eq("farm_id", farmId).gte("entry_date", startDate).lte("entry_date", endDate);
      if (entriesError) {
        console.error("Database error:", entriesError);
        return new Response(JSON.stringify({ error: "Database error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      const totals = entries.reduce((acc, entry) => {
        if (entry.type === "income") {
          acc.total_income += entry.amount;
        } else if (entry.type === "expense") {
          acc.total_expenses += entry.amount;
        }
        return acc;
      }, { total_income: 0, total_expenses: 0 });
      const categories = entries.reduce((acc, entry) => {
        const key = `${entry.category}-${entry.type}`;
        if (!acc[key]) {
          acc[key] = {
            category: entry.category,
            type: entry.type,
            total_amount: 0,
            transaction_count: 0
          };
        }
        acc[key].total_amount += entry.amount;
        acc[key].transaction_count += 1;
        return acc;
      }, {});
      const summary = {
        period: { start_date: startDate, end_date: endDate },
        totals,
        categories: Object.values(categories),
        entries
      };
      return new Response(JSON.stringify(summary), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      const mockReport = {
        type,
        period: "2024-10",
        totalIncome: type === "income" ? 5e3 : 0,
        totalExpenses: type === "expenses" ? 2500 : 0,
        netProfit: type === "profit" ? 2500 : 0,
        entries: [
          {
            id: "entry-1",
            amount: 1500,
            description: "Mock entry",
            date: "2024-10-15T00:00:00Z"
          }
        ]
      };
      return new Response(JSON.stringify(mockReport), {
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Finance reports API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest, "onRequest");
var init_type = __esm({
  "api/finance/reports/[type].js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest, "onRequest");
  }
});
async function onRequest2(context) {
  const { request, env, params } = context;
  const { type } = params;
  const url = new URL(request.url);
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const mockReport = {
      type,
      period: "2024-10",
      totalIncome: type === "income" ? 5e3 : 0,
      totalExpenses: type === "expenses" ? 2500 : 0,
      netProfit: type === "profit" ? 2500 : 0,
      entries: [
        {
          id: "entry-1",
          amount: 1500,
          description: "Mock entry",
          date: "2024-10-15T00:00:00Z"
        }
      ]
    };
    return new Response(JSON.stringify(mockReport), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Finance reports API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest2, "onRequest2");
var init_type_new = __esm({
  "api/finance/reports/[type]_new.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest2, "onRequest");
  }
});
async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      user: data.user,
      session: data.session
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");
var init_login = __esm({
  "api/auth/login.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequestPost, "onRequestPost");
  }
});
async function onRequestPost2(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "Email, password, and name required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });
    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    return new Response(JSON.stringify({
      user: mockUser,
      message: "User created successfully (mock response for testing)"
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost2, "onRequestPost2");
var init_signup = __esm({
  "api/auth/signup.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequestPost2, "onRequestPost");
  }
});
async function onRequest3(context) {
  const { request, env } = context;
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (method === "GET") {
      const mockEntries = [
        {
          id: "entry-1",
          type: "income",
          amount: 1500,
          description: "Corn harvest sale",
          date: "2024-10-15T00:00:00Z",
          category: "Sales"
        }
      ];
      return new Response(JSON.stringify(mockEntries), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const mockEntry = {
        id: `entry-${Date.now()}`,
        type: body.type || "expense",
        amount: body.amount || 0,
        description: body.description || "Mock entry",
        date: (/* @__PURE__ */ new Date()).toISOString(),
        category: body.category || "General"
      };
      return new Response(JSON.stringify(mockEntry), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Finance entries API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest3, "onRequest3");
var init_entries = __esm({
  "api/finance/entries.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest3, "onRequest");
  }
});
async function onRequest4(context) {
  const { request, env } = context;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const mockLowStock = [
      {
        id: "inv-1",
        name: "Fertilizer",
        current_stock: 5,
        min_stock_level: 20,
        unit: "bags",
        status: "low_stock"
      }
    ];
    return new Response(JSON.stringify(mockLowStock), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Low stock API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest4, "onRequest4");
var init_low_stock = __esm({
  "api/inventory/low-stock.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest4, "onRequest");
  }
});
async function onRequest5(context) {
  const { request, env } = context;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY;
  const SENTRY_DSN = env.SENTRY_DSN;
  try {
    if (!SUPABASE_URL || !SERVICE_ROLE) {
      throw new Error("Server misconfigured: missing Supabase credentials");
    }
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: "GET",
      headers: { "Authorization": authHeader }
    });
    if (!userRes.ok) {
      return new Response(JSON.stringify({ error: "invalid token" }), { status: 401 });
    }
    const userJson = await userRes.json();
    const userId = userJson?.id;
    if (!userId) return new Response(JSON.stringify({ error: "could not determine user id" }), { status: 401 });
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "invalid json" }), { status: 400 });
    }
    const idempotencyKey = request.headers.get("Idempotency-Key") || null;
    const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/apply_treatment`;
    const rpcBody = { payload, user_id: userId, idempotency_key: idempotencyKey };
    const rpcRes = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE,
        "Authorization": `Bearer ${SERVICE_ROLE}`
      },
      body: JSON.stringify(rpcBody)
    });
    const rpcJson = await rpcRes.text();
    let responseBody;
    try {
      responseBody = JSON.parse(rpcJson);
    } catch (e) {
      responseBody = { error: "invalid rpc response" };
    }
    let status = rpcRes.status;
    if (responseBody.error === "insufficient_inventory") {
      status = 409;
    } else if (responseBody.error) {
      status = 400;
    }
    if (status === 200 && responseBody.treatmentId) {
      triggerTreatmentAppliedWebhook(env, {
        treatmentId: responseBody.treatmentId,
        farmId: payload.farmId,
        items: payload.items,
        appliedAt: payload.appliedAt,
        recordedBy: userId
      }).catch((err) => console.error("Webhook trigger failed:", err));
    }
    console.log(`apply-treatment: user=${userId}, status=${status}, idempotency=${idempotencyKey}`);
    return new Response(JSON.stringify(responseBody), { status, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("apply-treatment error:", error);
    return new Response(JSON.stringify({ error: "internal server error" }), { status: 500 });
  }
}
__name(onRequest5, "onRequest5");
async function triggerTreatmentAppliedWebhook(env, data) {
  try {
    const webhookUrl = `${env.CF_PAGES_URL || "http://localhost:8788"}/api/webhooks/events`;
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.WEBHOOK_SECRET}`
      },
      body: JSON.stringify({
        event: "treatment.applied",
        data
      })
    });
  } catch (error) {
    console.error("Failed to trigger webhook:", error);
  }
}
__name(triggerTreatmentAppliedWebhook, "triggerTreatmentAppliedWebhook");
var init_apply_treatment_cloudflare = __esm({
  "api/operations/apply-treatment-cloudflare.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(onRequest5, "onRequest");
    __name2(triggerTreatmentAppliedWebhook, "triggerTreatmentAppliedWebhook");
  }
});
async function onRequest6(context) {
  const { request, env, params } = context;
  const method = request.method;
  const itemId = params.id;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    if (method === "GET") {
      const { data: item, error } = await dbClient.from("inventory_items").select("*").eq("id", itemId).single();
      if (error || !item) {
        return new Response(JSON.stringify({ error: "Item not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: farmAccess, error: accessError } = await dbClient.from("farm_members").select("id").eq("farm_id", item.farm_id).eq("user_id", user.id).single();
      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify(item), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "PUT") {
      const body = await request.json();
      const { data: existingItem, error: getError } = await dbClient.from("inventory_items").select("farm_id").eq("id", itemId).single();
      if (getError || !existingItem) {
        return new Response(JSON.stringify({ error: "Item not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: farmAccess, error: accessError } = await dbClient.from("farm_members").select("id").eq("farm_id", existingItem.farm_id).eq("user_id", user.id).single();
      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: updatedItem, error: updateError } = await dbClient.from("inventory_items").update(body).eq("id", itemId).select().single();
      if (updateError) {
        console.error("Update error:", updateError);
        return new Response(JSON.stringify({ error: "Failed to update item" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify(updatedItem), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "DELETE") {
      const { data: existingItem, error: getError } = await dbClient.from("inventory_items").select("farm_id").eq("id", itemId).single();
      if (getError || !existingItem) {
        return new Response(JSON.stringify({ error: "Item not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: farmAccess, error: accessError } = await dbClient.from("farm_members").select("id").eq("farm_id", existingItem.farm_id).eq("user_id", user.id).single();
      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { error: deleteError } = await dbClient.from("inventory_items").delete().eq("id", itemId);
      if (deleteError) {
        console.error("Delete error:", deleteError);
        return new Response(JSON.stringify({ error: "Failed to delete item" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({ message: "Item deleted successfully" }), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Inventory item API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest6, "onRequest6");
var init_id = __esm({
  "api/inventory/[id].js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest6, "onRequest");
  }
});
async function onRequest7(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    if (method === "GET") {
      const { data: animals, error } = await dbClient.from("animals").select(`
          id, tag, species, breed, sex, birth_date, status, notes, created_at,
          farms!inner(name),
          farm_members!inner(user_id),
          sectors(name)
        `).eq("farm_members.user_id", user.id).order("created_at", { ascending: false });
      if (error) {
        console.error("Database error:", error);
        return new Response(JSON.stringify({ error: "Database error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      const transformedAnimals = animals.map((animal) => ({
        id: animal.id,
        tag: animal.tag,
        species: animal.species,
        breed: animal.breed,
        sex: animal.sex,
        birth_date: animal.birth_date,
        status: animal.status,
        notes: animal.notes,
        created_at: animal.created_at,
        farm_name: animal.farms?.name,
        sector_name: animal.sectors?.name
      }));
      return new Response(JSON.stringify(transformedAnimals), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const { farm_id, tag, species, breed, sex, birth_date, notes } = body;
      if (!farm_id || !tag || !species) {
        return new Response(JSON.stringify({ error: "Farm ID, tag, and species required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: farmAccess, error: accessError } = await dbClient.from("farm_members").select("id").eq("farm_id", farm_id).eq("user_id", user.id).single();
      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: "Access denied" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: newAnimal, error: insertError } = await dbClient.from("animals").insert({
        farm_id,
        tag,
        species,
        breed: breed || null,
        sex: sex || null,
        birth_date: birth_date || null,
        notes: notes || null
      }).select().single();
      if (insertError) {
        console.error("Insert error:", insertError);
        return new Response(JSON.stringify({ error: "Failed to create animal" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify(newAnimal), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Animals API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest7, "onRequest7");
var init_animals = __esm({
  "api/animals.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest7, "onRequest");
  }
});
async function onRequest8(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    if (method === "GET") {
      const { data: farms, error } = await dbClient.from("farms").select("id, name, location, area_hectares, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) {
        console.error("Database error:", error);
        return new Response(JSON.stringify({ error: "Database error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify(farms), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const { name, location, area_hectares } = body;
      if (!name || !location) {
        return new Response(JSON.stringify({ error: "Name and location required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { data: newFarm, error: insertError } = await dbClient.from("farms").insert({
        user_id: user.id,
        name,
        location,
        area_hectares: area_hectares || null
      }).select().single();
      if (insertError) {
        console.error("Insert error:", insertError);
        return new Response(JSON.stringify({ error: "Failed to create farm" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify(newFarm), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Farm API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest8, "onRequest8");
var init_farms = __esm({
  "api/farms.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest8, "onRequest");
  }
});
async function onRequest9(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (method === "GET") {
      const mockFields = [
        {
          id: "field-1",
          name: "North Field",
          area_hectares: 5.2,
          crop_type: "Corn",
          notes: "Main corn field",
          created_at: "2024-01-15T10:00:00Z",
          farm_name: "Green Valley Farm"
        },
        {
          id: "field-2",
          name: "South Pasture",
          area_hectares: 8.1,
          crop_type: null,
          notes: "Grazing area",
          created_at: "2024-02-01T14:30:00Z",
          farm_name: "Green Valley Farm"
        }
      ];
      return new Response(JSON.stringify(mockFields), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const { farm_id, name } = body;
      if (!farm_id || !name) {
        return new Response(JSON.stringify({ error: "Farm ID and name required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const mockField = {
        id: `field-${Date.now()}`,
        name,
        area_hectares: body.area_hectares || null,
        crop_type: body.crop_type || null,
        notes: body.notes || null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        farm_name: "Mock Farm"
      };
      return new Response(JSON.stringify(mockField), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Fields API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest9, "onRequest9");
var init_fields = __esm({
  "api/fields.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest9, "onRequest");
  }
});
async function onRequest10(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (method === "GET") {
      const mockInventory = [
        {
          id: "inv-1",
          name: "Corn Seeds",
          category: "Seeds",
          quantity: 150,
          unit: "kg",
          min_stock_level: 50,
          current_stock_level: 150,
          location: "Warehouse A",
          expiry_date: "2025-06-01T00:00:00Z",
          created_at: "2024-10-01T10:00:00Z"
        },
        {
          id: "inv-2",
          name: "Fertilizer",
          category: "Chemicals",
          quantity: 75,
          unit: "bags",
          min_stock_level: 20,
          current_stock_level: 75,
          location: "Warehouse B",
          expiry_date: null,
          created_at: "2024-09-15T14:30:00Z"
        }
      ];
      return new Response(JSON.stringify(mockInventory), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const { name, category, quantity, unit, min_stock_level } = body;
      if (!name || !category) {
        return new Response(JSON.stringify({ error: "Name and category required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const mockItem = {
        id: `inv-${Date.now()}`,
        name,
        category,
        quantity: quantity || 0,
        unit: unit || "units",
        min_stock_level: min_stock_level || 10,
        current_stock_level: quantity || 0,
        location: "Warehouse A",
        expiry_date: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      return new Response(JSON.stringify(mockItem), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Inventory API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest10, "onRequest10");
var init_inventory = __esm({
  "api/inventory/index.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest10, "onRequest");
  }
});
async function onRequest11(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (method === "GET") {
      const mockTasks = [
        {
          id: "task-1",
          title: "Plant corn seeds",
          description: "Plant corn seeds in North Field",
          status: "pending",
          priority: "high",
          due_date: "2024-11-15T00:00:00Z",
          created_at: "2024-10-30T10:00:00Z",
          farm_name: "Green Valley Farm",
          assigned_to_name: "John Farmer"
        },
        {
          id: "task-2",
          title: "Check irrigation system",
          description: "Inspect irrigation system in South Field",
          status: "in_progress",
          priority: "medium",
          due_date: "2024-11-01T00:00:00Z",
          created_at: "2024-10-28T14:30:00Z",
          farm_name: "Green Valley Farm",
          assigned_to_name: null
        }
      ];
      return new Response(JSON.stringify(mockTasks), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = await request.json();
      const { farm_id, title, description, priority, due_date } = body;
      if (!farm_id || !title) {
        return new Response(JSON.stringify({ error: "Farm ID and title required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const mockTask = {
        id: `task-${Date.now()}`,
        title,
        description: description || null,
        status: "pending",
        priority: priority || "medium",
        due_date: due_date || null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        farm_name: "Mock Farm",
        assigned_to_name: null
      };
      return new Response(JSON.stringify(mockTask), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Tasks API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest11, "onRequest11");
var init_tasks = __esm({
  "api/tasks.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    init_module5();
    __name2(onRequest11, "onRequest");
  }
});
async function onRequest12(context) {
  const { env } = context;
  try {
    const checks = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "healthy",
      checks: {}
    };
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/`, {
        headers: {
          "apikey": env.SUPABASE_SERVICE_ROLE_KEY
        }
      });
      checks.checks.supabase = response.ok ? "healthy" : "unhealthy";
    } catch (error) {
      checks.checks.supabase = "unhealthy";
    }
    if (env.RATE_LIMIT_KV) {
      try {
        await env.RATE_LIMIT_KV.put("health_check", "ok", { expirationTtl: 60 });
        checks.checks.kv = "healthy";
      } catch (error) {
        checks.checks.kv = "unhealthy";
      }
    }
    const allHealthy = Object.values(checks.checks).every((status) => status === "healthy");
    checks.status = allHealthy ? "healthy" : "degraded";
    return new Response(JSON.stringify(checks, null, 2), {
      headers: { "Content-Type": "application/json" },
      status: allHealthy ? 200 : 503
    });
  } catch (error) {
    return new Response(JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "unhealthy",
      error: error.message
    }), {
      headers: { "Content-Type": "application/json" },
      status: 503
    });
  }
}
__name(onRequest12, "onRequest12");
var init_health = __esm({
  "health.js"() {
    init_functionsRoutes_0_8151184710348445();
    init_checked_fetch();
    __name2(onRequest12, "onRequest");
  }
});
var routes;
var init_functionsRoutes_0_8151184710348445 = __esm({
  "../.wrangler/tmp/pages-Gca0Yl/functionsRoutes-0.8151184710348445.mjs"() {
    init_type();
    init_type_new();
    init_login();
    init_signup();
    init_entries();
    init_low_stock();
    init_apply_treatment_cloudflare();
    init_id();
    init_animals();
    init_farms();
    init_fields();
    init_inventory();
    init_tasks();
    init_health();
    routes = [
      {
        routePath: "/api/finance/reports/:type",
        mountPath: "/api/finance/reports",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/api/finance/reports/:type_new",
        mountPath: "/api/finance/reports",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      },
      {
        routePath: "/api/auth/login",
        mountPath: "/api/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/auth/signup",
        mountPath: "/api/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost2]
      },
      {
        routePath: "/api/finance/entries",
        mountPath: "/api/finance",
        method: "",
        middlewares: [],
        modules: [onRequest3]
      },
      {
        routePath: "/api/inventory/low-stock",
        mountPath: "/api/inventory",
        method: "",
        middlewares: [],
        modules: [onRequest4]
      },
      {
        routePath: "/api/operations/apply-treatment-cloudflare",
        mountPath: "/api/operations",
        method: "",
        middlewares: [],
        modules: [onRequest5]
      },
      {
        routePath: "/api/inventory/:id",
        mountPath: "/api/inventory",
        method: "",
        middlewares: [],
        modules: [onRequest6]
      },
      {
        routePath: "/api/animals",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest7]
      },
      {
        routePath: "/api/farms",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest8]
      },
      {
        routePath: "/api/fields",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest9]
      },
      {
        routePath: "/api/inventory",
        mountPath: "/api/inventory",
        method: "",
        middlewares: [],
        modules: [onRequest10]
      },
      {
        routePath: "/api/tasks",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest11]
      },
      {
        routePath: "/health",
        mountPath: "/",
        method: "",
        middlewares: [],
        modules: [onRequest12]
      }
    ];
  }
});
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index2 = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index2, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.decode, decode = _a2 === void 0 ? function(x) {
    return x;
  } : _a2;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index2 = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index: index2, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index2 = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index2++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_8151184710348445();
init_checked_fetch();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-yqEZEt/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-yqEZEt/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.6583998884922979.js.map
