import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Configuramos Jest para usar timers falsos
jest.useFakeTimers();

describe("useDebounce Hook", () => {
  test("debe devolver el valor inicial inmediatamente", () => {
    const { result } = renderHook(() => useDebounce("hola", 500));
    expect(result.current).toBe("hola");
  });

  test("debe actualizar el valor solo después de que pase el tiempo (delay)", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "inicio", delay: 500 },
      }
    );

    // Cambiamos la prop a "final"
    rerender({ value: "final", delay: 500 });

    // En este punto, todavía debería ser "inicio" porque no pasaron los 500ms
    expect(result.current).toBe("inicio");

    // Adelantamos el tiempo manualmente 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Ahora sí debería ser "final"
    expect(result.current).toBe("final");
  });

  test("debe limpiar el timer si el valor cambia antes de que termine el delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "A", delay: 500 },
      }
    );

    rerender({ value: "B", delay: 500 });
    
    // Adelantamos solo 200ms (faltan 300ms)
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: "C", delay: 500 });

    // Adelantamos otros 300ms. Si no se limpiara el timer, "B" podría aparecer.
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // El valor debería seguir siendo "A" (o el inicial) hasta que pasen 
    // los 500ms completos desde el ÚLTIMO cambio ("C")
    expect(result.current).not.toBe("B");
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(result.current).toBe("C");
  });
});