"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activate_1 = require("../controllers/activate");
const router = (0, express_1.Router)();
router.get('/', activate_1.activate);
router.get('/status', activate_1.status);
exports.default = router;
