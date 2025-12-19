// Lightweight re-export wrapper to use existing `lib/api` services from the app code.
// The project's service implementations live at `../../lib/api/*.ts`.
import * as api from '../../../lib/api';

export default api;
export * from '../../../lib/api';
