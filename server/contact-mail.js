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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import nodemailer from 'nodemailer';
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
function readRequiredEnv(env) {
    var _a, _b;
    var host = env.SMTP_HOST;
    var port = Number(env.SMTP_PORT);
    var user = env.SMTP_USER;
    var pass = (_a = env.SMTP_PASS) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, '');
    var to = (_b = env.MAIL_TO) !== null && _b !== void 0 ? _b : env.SMTP_USER;
    if (!host || !port || !user || !pass || !to) {
        throw new Error('MAIL_ENV_MISSING');
    }
    return { host: host, port: port, user: user, pass: pass, to: to };
}
function ensureText(value, minLength) {
    if (minLength === void 0) { minLength = 1; }
    return typeof value === 'string' && value.trim().length >= minLength;
}
function validatePayload(payload) {
    if (!payload || typeof payload !== 'object') {
        return false;
    }
    var data = payload;
    if (data.kind === 'contact') {
        return (ensureText(data.name, 2) &&
            ensureText(data.company, 2) &&
            ensureText(data.phone, 10) &&
            ensureText(data.email, 5) &&
            ensureText(data.message, 10));
    }
    if (data.kind === 'lead') {
        return ensureText(data.name, 2) && ensureText(data.phone, 10) && ensureText(data.service, 2);
    }
    return false;
}
function buildMail(payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (payload.kind === 'contact') {
        var subject_1 = "Yeni \u0130leti\u015Fim Formu - ".concat(payload.company);
        var text_1 = [
            'Lunara Medya web sitesi üzerinden yeni bir proje talebi geldi.',
            '',
            "Ad Soyad: ".concat(payload.name),
            "Marka / Firma: ".concat(payload.company),
            "Telefon: ".concat(payload.phone),
            "E-posta: ".concat(payload.email),
            '',
            'Proje Notu:',
            payload.message,
        ].join('\n');
        var html_1 = "\n      <div style=\"font-family:Arial,sans-serif;color:#0f172a;line-height:1.6\">\n        <h2 style=\"margin:0 0 18px\">Yeni proje talebi</h2>\n        <table style=\"border-collapse:collapse;width:100%;max-width:680px\">\n          <tr><td style=\"padding:8px 0;font-weight:700\">Ad Soyad</td><td style=\"padding:8px 0\">".concat(escapeHtml((_a = payload.name) !== null && _a !== void 0 ? _a : ''), "</td></tr>\n          <tr><td style=\"padding:8px 0;font-weight:700\">Marka / Firma</td><td style=\"padding:8px 0\">").concat(escapeHtml((_b = payload.company) !== null && _b !== void 0 ? _b : ''), "</td></tr>\n          <tr><td style=\"padding:8px 0;font-weight:700\">Telefon</td><td style=\"padding:8px 0\">").concat(escapeHtml((_c = payload.phone) !== null && _c !== void 0 ? _c : ''), "</td></tr>\n          <tr><td style=\"padding:8px 0;font-weight:700\">E-posta</td><td style=\"padding:8px 0\">").concat(escapeHtml((_d = payload.email) !== null && _d !== void 0 ? _d : ''), "</td></tr>\n        </table>\n        <div style=\"margin-top:20px;padding:18px;border-radius:16px;background:#eef6ff;border:1px solid #c7d2fe\">\n          <div style=\"font-weight:700;margin-bottom:10px\">Proje Notu</div>\n          <div>").concat(escapeHtml((_e = payload.message) !== null && _e !== void 0 ? _e : '').replace(/\n/g, '<br />'), "</div>\n        </div>\n      </div>\n    ");
        return {
            subject: subject_1,
            text: text_1,
            html: html_1,
            replyTo: (_f = payload.email) === null || _f === void 0 ? void 0 : _f.trim(),
        };
    }
    var subject = "Yeni Teklif Talebi - ".concat(payload.service);
    var text = [
        'Lunara Medya teklif modalı üzerinden yeni bir talep geldi.',
        '',
        "Ad Soyad: ".concat(payload.name),
        "Telefon: ".concat(payload.phone),
        "\u0130lgilendi\u011Fi Hizmet: ".concat(payload.service),
    ].join('\n');
    var html = "\n    <div style=\"font-family:Arial,sans-serif;color:#0f172a;line-height:1.6\">\n      <h2 style=\"margin:0 0 18px\">Yeni teklif talebi</h2>\n      <table style=\"border-collapse:collapse;width:100%;max-width:680px\">\n        <tr><td style=\"padding:8px 0;font-weight:700\">Ad Soyad</td><td style=\"padding:8px 0\">".concat(escapeHtml((_g = payload.name) !== null && _g !== void 0 ? _g : ''), "</td></tr>\n        <tr><td style=\"padding:8px 0;font-weight:700\">Telefon</td><td style=\"padding:8px 0\">").concat(escapeHtml((_h = payload.phone) !== null && _h !== void 0 ? _h : ''), "</td></tr>\n        <tr><td style=\"padding:8px 0;font-weight:700\">\u0130lgilendi\u011Fi Hizmet</td><td style=\"padding:8px 0\">").concat(escapeHtml((_j = payload.service) !== null && _j !== void 0 ? _j : ''), "</td></tr>\n      </table>\n    </div>\n  ");
    return {
        subject: subject,
        text: text,
        html: html,
        replyTo: undefined,
    };
}
export function submitMailRequest(payload, env) {
    return __awaiter(this, void 0, void 0, function () {
        var config, transporter, mail, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validatePayload(payload)) {
                        return [2 /*return*/, {
                                status: 400,
                                body: {
                                    ok: false,
                                    message: 'Form verileri eksik veya hatalı.',
                                },
                            }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    config = readRequiredEnv(env);
                    transporter = nodemailer.createTransport({
                        host: config.host,
                        port: config.port,
                        secure: config.port === 465,
                        auth: {
                            user: config.user,
                            pass: config.pass,
                        },
                    });
                    mail = buildMail(payload);
                    return [4 /*yield*/, transporter.sendMail({
                            from: "\"Lunara Medya Web Form\" <".concat(config.user, ">"),
                            to: config.to,
                            subject: mail.subject,
                            text: mail.text,
                            html: mail.html,
                            replyTo: mail.replyTo,
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, {
                            status: 200,
                            body: {
                                ok: true,
                                message: 'Mesajınız başarıyla gönderildi.',
                            },
                        }];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, {
                            status: 500,
                            body: {
                                ok: false,
                                message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
                            },
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function readJsonBody(request) {
    return __awaiter(this, void 0, void 0, function () {
        var chunks, chunk, e_1_1, rawBody;
        var _a, request_1, request_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    chunks = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = true, request_1 = __asyncValues(request);
                    _e.label = 2;
                case 2: return [4 /*yield*/, request_1.next()];
                case 3:
                    if (!(request_1_1 = _e.sent(), _b = request_1_1.done, !_b)) return [3 /*break*/, 5];
                    _d = request_1_1.value;
                    _a = false;
                    chunk = _d;
                    chunks.push(chunk);
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = request_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(request_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    if (!chunks.length) {
                        return [2 /*return*/, null];
                    }
                    rawBody = Buffer.concat(chunks).toString('utf8');
                    return [2 /*return*/, rawBody ? JSON.parse(rawBody) : null];
            }
        });
    });
}
