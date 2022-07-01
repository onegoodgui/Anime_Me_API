var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { errorTypes } from "../utils/errorUtils.js";
function signUp(createUserData) {
    return __awaiter(this, void 0, void 0, function () {
        var existingUser, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(createUserData.email)];
                case 1:
                    existingUser = _a.sent();
                    if (existingUser)
                        throw errorTypes.conflictError("Email must be unique");
                    hashedPassword = bcrypt.hashSync(createUserData.password, 12);
                    return [4 /*yield*/, userRepository.insert(__assign(__assign({}, createUserData), { password: hashedPassword }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function signIn(loginData) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserOrFail(loginData)];
                case 1:
                    user = _a.sent();
                    token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
                    return [2 /*return*/, token];
            }
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw errorTypes.notFoundError("User not found");
                    return [2 /*return*/, user];
            }
        });
    });
}
function getUserOrFail(loginData) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isPasswordValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(loginData.email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw errorTypes.unauthorizedError("User not registered");
                    isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
                    if (!isPasswordValid)
                        throw errorTypes.unauthorizedError("Invalid password");
                    return [2 /*return*/, user];
            }
        });
    });
}
function truncate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.truncate()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export default {
    signUp: signUp,
    signIn: signIn,
    findById: findById,
    truncate: truncate
};
