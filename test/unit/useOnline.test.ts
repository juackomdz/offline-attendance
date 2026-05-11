import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref, onMounted, onUnmounted, watch, type Ref } from "vue";

vi.mock("vue", async (importOriginal) => {
  const original = await importOriginal<typeof import("vue")>();
  return {
    ...original,
    onMounted: vi.fn((cb: () => void) => {
      (onMounted as unknown as { _callback?: () => void })._callback = cb;
    }),
    onUnmounted: vi.fn((cb: () => void) => {
      (onUnmounted as unknown as { _callback?: () => void })._callback = cb;
    }),
  };
});

describe("isOnline", () => {
  let onlineRef: Ref<boolean>;
  let mountedCallback: (() => void) | undefined;
  let unmountedCallback: (() => void) | undefined;
  const listeners: Record<string, EventListener> = {};

  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(listeners)) delete listeners[key];

    vi.stubGlobal("navigator", { onLine: true });
    vi.stubGlobal("window", {
      addEventListener: vi.fn((event: string, cb: EventListener) => {
        listeners[event] = cb;
      }),
      removeEventListener: vi.fn((event: string) => {
        delete listeners[event];
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function callIsOnline() {
    const { isOnline } = await import("@/composables/useOnline");
    const result = isOnline();
    onlineRef = result.online;

    mountedCallback = (onMounted as unknown as { _callback?: () => void })
      ._callback;
    unmountedCallback = (
      onUnmounted as unknown as { _callback?: () => void }
    )._callback;

    mountedCallback?.();
    return result;
  }

  it("returns online as true when navigator.onLine is true", async () => {
    const { online } = await callIsOnline();
    expect(online.value).toBe(true);
  });

  it("returns online as false when navigator.onLine is false", async () => {
    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
      configurable: true,
    });
    const { online } = await callIsOnline();
    expect(online.value).toBe(false);
  });

  it("registers online and offline event listeners on mount", async () => {
    await callIsOnline();

    expect(window.addEventListener).toHaveBeenCalledWith(
      "online",
      expect.any(Function),
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "offline",
      expect.any(Function),
    );
  });

  it("removes event listeners on unmount", async () => {
    await callIsOnline();

    unmountedCallback?.();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "online",
      expect.any(Function),
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "offline",
      expect.any(Function),
    );
  });

  it("updates online to false when offline event fires", async () => {
    const { online } = await callIsOnline();
    expect(online.value).toBe(true);

    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
      configurable: true,
    });
    listeners["offline"]?.(new Event("offline"));

    expect(online.value).toBe(false);
  });

  it("updates online to true when online event fires", async () => {
    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
      configurable: true,
    });
    const { online } = await callIsOnline();
    expect(online.value).toBe(false);

    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
      configurable: true,
    });
    listeners["online"]?.(new Event("online"));

    expect(online.value).toBe(true);
  });
});
