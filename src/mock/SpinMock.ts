import { SLOT_CONFIG, SYMBOLS, TIMING } from "../globals/constans";
import { SpinResult } from "../globals/types";

export function mockSpin(): Promise<SpinResult> {
    return new Promise(resolve => {
      setTimeout(() => {
        const matrix = Array.from({ length: SLOT_CONFIG.REELS }, () =>
          Array.from({ length: SLOT_CONFIG.ROWS }, () =>
            Math.floor(Math.random() * SYMBOLS.COUNT)
          )
        );

        const win = Math.random() < 0.3 ? Math.floor(Math.random() * 100) : 0;

        resolve({ matrix, win });
      }, TIMING.MOCK_RESULT_DELAY);
    });
}