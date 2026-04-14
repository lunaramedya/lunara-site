var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { readJsonBody, submitMailRequest } from './server/contact-mail';
import { createSession, verifyAdminPassword, requireAdmin } from './server/admin-auth';
import { getContent, setContent, insertEventLog, runQuery } from './server/db';
import { getRequestMeta } from './server/request';
function contactApiPlugin(env) {
    return {
        name: 'lunara-contact-api',
        configureServer: function (server) {
            var _this = this;
            server.middlewares.use('/api/contact', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var payload, meta, result, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            if (req.method !== 'POST') {
                                next();
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, readJsonBody(req)];
                        case 2:
                            payload = _b.sent();
                            meta = getRequestMeta(req);
                            return [4 /*yield*/, submitMailRequest(payload, env, meta)];
                        case 3:
                            result = _b.sent();
                            res.statusCode = result.status;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(result.body));
                            return [3 /*break*/, 5];
                        case 4:
                            _a = _b.sent();
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({
                                ok: false,
                                message: 'Sunucu tarafında bir hata oluştu. Lütfen tekrar deneyin.',
                            }));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            server.middlewares.use('/api/content', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var content, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            if (req.method !== 'GET') {
                                res.statusCode = 405;
                                res.end();
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, getContent(env, 'site')];
                        case 2:
                            content = _b.sent();
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true, content: content }));
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _b.sent();
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: false, message: 'İçerik alınamadı.' }));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            server.middlewares.use('/api/log', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var payload, meta, _a;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            if (req.method !== 'POST') {
                                res.statusCode = 405;
                                res.end();
                                return [2 /*return*/];
                            }
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, readJsonBody(req)];
                        case 2:
                            payload = _e.sent();
                            meta = getRequestMeta(req);
                            if (!((payload === null || payload === void 0 ? void 0 : payload.eventType) && (payload === null || payload === void 0 ? void 0 : payload.eventName))) return [3 /*break*/, 4];
                            return [4 /*yield*/, insertEventLog(env, {
                                    eventType: payload.eventType,
                                    eventName: payload.eventName,
                                    page: payload.page,
                                    sessionId: payload.sessionId,
                                    metadata: payload.metadata,
                                    ip: (_b = meta.ip) !== null && _b !== void 0 ? _b : null,
                                    userAgent: (_c = meta.userAgent) !== null && _c !== void 0 ? _c : null,
                                    referrer: (_d = meta.referrer) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 3:
                            _e.sent();
                            _e.label = 4;
                        case 4:
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true }));
                            return [3 /*break*/, 6];
                        case 5:
                            _a = _e.sent();
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: false }));
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            server.middlewares.use('/api/admin/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var payload, password, session, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            if (req.method !== 'POST') {
                                res.statusCode = 405;
                                res.end();
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, readJsonBody(req)];
                        case 2:
                            payload = _b.sent();
                            password = payload === null || payload === void 0 ? void 0 : payload.password;
                            if (!password || typeof password !== 'string') {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ ok: false, message: 'Şifre zorunludur.' }));
                                return [2 /*return*/];
                            }
                            if (!verifyAdminPassword(env, password.trim())) {
                                res.statusCode = 401;
                                res.end(JSON.stringify({ ok: false, message: 'Şifre hatalı.' }));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, createSession(env)];
                        case 3:
                            session = _b.sent();
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true, token: session.token, expiresAt: session.expiresAt.toISOString() }));
                            return [3 /*break*/, 5];
                        case 4:
                            _a = _b.sent();
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: false, message: 'Giriş yapılamadı.' }));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            var getAuthToken = function (headers) {
                var _a;
                var auth = (_a = headers === null || headers === void 0 ? void 0 : headers.authorization) !== null && _a !== void 0 ? _a : headers === null || headers === void 0 ? void 0 : headers.Authorization;
                var value = Array.isArray(auth) ? auth[0] : auth;
                return value === null || value === void 0 ? void 0 : value.split(' ')[1];
            };
            server.middlewares.use('/api/admin/content', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var token, isAdmin, content, payload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            token = getAuthToken(req.headers);
                            return [4 /*yield*/, requireAdmin(env, token)];
                        case 1:
                            isAdmin = _a.sent();
                            if (!isAdmin) {
                                res.statusCode = 401;
                                res.end(JSON.stringify({ ok: false, message: 'Yetkisiz erişim.' }));
                                return [2 /*return*/];
                            }
                            if (!(req.method === 'GET')) return [3 /*break*/, 3];
                            return [4 /*yield*/, getContent(env, 'site')];
                        case 2:
                            content = _a.sent();
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true, content: content }));
                            return [2 /*return*/];
                        case 3:
                            if (!(req.method === 'PUT')) return [3 /*break*/, 6];
                            return [4 /*yield*/, readJsonBody(req)];
                        case 4:
                            payload = _a.sent();
                            return [4 /*yield*/, setContent(env, 'site', payload, 'admin')];
                        case 5:
                            _a.sent();
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true }));
                            return [2 /*return*/];
                        case 6:
                            res.statusCode = 405;
                            res.end();
                            return [2 /*return*/];
                    }
                });
            }); });
            var adminListHandler = function (req, res, table) { return __awaiter(_this, void 0, void 0, function () {
                var token, isAdmin, params, limit, rows;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (req.method === 'OPTIONS') {
                                res.statusCode = 204;
                                res.end();
                                return [2 /*return*/];
                            }
                            token = getAuthToken(req.headers);
                            return [4 /*yield*/, requireAdmin(env, token)];
                        case 1:
                            isAdmin = _c.sent();
                            if (!isAdmin) {
                                res.statusCode = 401;
                                res.end(JSON.stringify({ ok: false, message: 'Yetkisiz erişim.' }));
                                return [2 /*return*/];
                            }
                            if (req.method !== 'GET') {
                                res.statusCode = 405;
                                res.end();
                                return [2 /*return*/];
                            }
                            params = new URL((_a = req.url) !== null && _a !== void 0 ? _a : '', 'http://localhost').searchParams;
                            limit = Math.min(Math.max(Number((_b = params.get('limit')) !== null && _b !== void 0 ? _b : 200), 1), 500);
                            return [4 /*yield*/, runQuery(env, "SELECT * FROM ".concat(table, " ORDER BY created_at DESC LIMIT $1"), [limit])];
                        case 2:
                            rows = _c.sent();
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ ok: true, items: rows }));
                            return [2 /*return*/];
                    }
                });
            }); };
            server.middlewares.use('/api/admin/logs', function (req, res) { return adminListHandler(req, res, 'event_logs'); });
            server.middlewares.use('/api/admin/leads', function (req, res) { return adminListHandler(req, res, 'leads'); });
            server.middlewares.use('/api/admin/contacts', function (req, res) { return adminListHandler(req, res, 'contacts'); });
        },
    };
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss(), contactApiPlugin(env)],
    };
});
