import { computed, effect, signal } from "@angular/core";

export function useDebounce<T>(input: () => T, delay = 500) {
    const debounced = signal<T>(input());
    let timeout: any;

    effect(() => {
        clearTimeout(timeout);
        const value = input();
        timeout = setTimeout(() => debounced.set(value), delay);
    })

    return computed(() => debounced());
}