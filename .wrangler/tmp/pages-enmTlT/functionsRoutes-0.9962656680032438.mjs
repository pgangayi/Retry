import { onRequest as __api_finance_reports__type__js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\finance\\reports\\[type].js"
import { onRequest as __api_finance_reports__type__new_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\finance\\reports\\[type]_new.js"
import { onRequestPost as __api_auth_login_js_onRequestPost } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\auth\\login.js"
import { onRequestPost as __api_auth_signup_js_onRequestPost } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\auth\\signup.js"
import { onRequest as __api_finance_entries_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\finance\\entries.js"
import { onRequest as __api_inventory_low_stock_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\inventory\\low-stock.js"
import { onRequest as __api_operations_apply_treatment_cloudflare_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\operations\\apply-treatment-cloudflare.js"
import { onRequest as __api_inventory__id__js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\inventory\\[id].js"
import { onRequest as __api_animals_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\animals.js"
import { onRequest as __api_farms_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\farms.js"
import { onRequest as __api_fields_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\fields.js"
import { onRequest as __api_inventory_index_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\inventory\\index.js"
import { onRequest as __api_tasks_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\api\\tasks.js"
import { onRequest as __health_js_onRequest } from "C:\\Users\\MunyaradziGangayi\\Documents\\Coder\\Retry\\functions\\health.js"

export const routes = [
    {
      routePath: "/api/finance/reports/:type",
      mountPath: "/api/finance/reports",
      method: "",
      middlewares: [],
      modules: [__api_finance_reports__type__js_onRequest],
    },
  {
      routePath: "/api/finance/reports/:type_new",
      mountPath: "/api/finance/reports",
      method: "",
      middlewares: [],
      modules: [__api_finance_reports__type__new_js_onRequest],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/auth/signup",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_signup_js_onRequestPost],
    },
  {
      routePath: "/api/finance/entries",
      mountPath: "/api/finance",
      method: "",
      middlewares: [],
      modules: [__api_finance_entries_js_onRequest],
    },
  {
      routePath: "/api/inventory/low-stock",
      mountPath: "/api/inventory",
      method: "",
      middlewares: [],
      modules: [__api_inventory_low_stock_js_onRequest],
    },
  {
      routePath: "/api/operations/apply-treatment-cloudflare",
      mountPath: "/api/operations",
      method: "",
      middlewares: [],
      modules: [__api_operations_apply_treatment_cloudflare_js_onRequest],
    },
  {
      routePath: "/api/inventory/:id",
      mountPath: "/api/inventory",
      method: "",
      middlewares: [],
      modules: [__api_inventory__id__js_onRequest],
    },
  {
      routePath: "/api/animals",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_animals_js_onRequest],
    },
  {
      routePath: "/api/farms",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_farms_js_onRequest],
    },
  {
      routePath: "/api/fields",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_fields_js_onRequest],
    },
  {
      routePath: "/api/inventory",
      mountPath: "/api/inventory",
      method: "",
      middlewares: [],
      modules: [__api_inventory_index_js_onRequest],
    },
  {
      routePath: "/api/tasks",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_tasks_js_onRequest],
    },
  {
      routePath: "/health",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__health_js_onRequest],
    },
  ]