import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from './validation.js';
const valid = { name: 'Edgar Jurado', email: 'edgar@example.com', subject: 'Proyecto web', message: 'Me gustaría conversar sobre un proyecto web.' };
test('accepts a valid contact request', () => assert.deepEqual(validateContact(valid), {}));
test('rejects whitespace and malformed email', () => assert.deepEqual(Object.keys(validateContact({ name: '  ', email: 'a@b', subject: ' ', message: ' ' })), ['name', 'email', 'subject', 'message']));
test('rejects oversized messages and translates errors', () => assert.match(validateContact({ ...valid, message: 'x'.repeat(5001) }, 'en').message, /20–5000/));
