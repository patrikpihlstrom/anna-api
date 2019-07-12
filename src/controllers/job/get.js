"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var job_repository_1 = require("../resources/job_repository");
var job_1 = require("../helpers/job");
var JobController = /** @class */ (function () {
    function JobController() {
        var _this = this;
        this.index = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var where, jobs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = job_1.getJobWhereInput(req);
                        return [4 /*yield*/, JobRepository.get(where)];
                    case 1:
                        jobs = _a.sent();
                        res.json(jobs);
                        return [2 /*return*/];
                }
            });
        }); };
        this.push = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jobRequests, jobs, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        jobRequests = job_1.getJobRequests(req);
                        if (jobRequests.length == 0) {
                            return [2 /*return*/, res.status(400).send('specify at least one driver & one site')];
                        }
                        jobs = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < jobRequests.length)) return [3 /*break*/, 4];
                        _b = (_a = jobs).push;
                        return [4 /*yield*/, JobRepository.create(jobRequests[i])];
                    case 2:
                        _b.apply(_a, [(_c.sent()).id]);
                        _c.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        res.status(200).send(jobs);
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var where, data, update, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = job_1.getJobWhereUniqueInput(req);
                        data = job_1.getJobUpdateInput(req);
                        if (!where || !data) {
                            return [2 /*return*/, res.status(400).send('bad request')];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, JobRepository.update(data, where)];
                    case 2:
                        update = _a.sent();
                        if (update) {
                            return [2 /*return*/, res.status(200).send(update)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).send(e_1.message)];
                    case 4: return [2 /*return*/, res.status(500).send('unknown error occurred')];
                }
            });
        }); };
        this.rm = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var where, rm, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = job_1.getJobWhereInput(req);
                        if (!where) {
                            return [2 /*return*/, res.status(400).send('bad request')];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.repository["delete"](where)];
                    case 2:
                        rm = _a.sent();
                        if (rm) {
                            return [2 /*return*/, res.status(200).send(rm)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        res.status(500).send(e_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res.status(500).send('unknown error occurred')];
                }
            });
        }); };
        this.repository = new job_repository_1.JobRepository();
    }
    return JobController;
}());
exports["default"] = new JobController();
