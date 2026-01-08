import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";

describe("Search Component", () => {
  const mockOnSearch = jest.fn();

  test("debe actualizar el valor y llamar a onSearch al escribir", () => {
    // Le pasamos el theme "red" para que no de error de tipos
    render(<Search onSearch={mockOnSearch} theme="red" />);
    
    // Buscamos por el placeholder exacto que tenés: "SEARCH..."
    const input = screen.getByPlaceholderText("SEARCH...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "Rick" } });
    
    expect(input.value).toBe("Rick");
    expect(mockOnSearch).toHaveBeenCalledWith("Rick");
  });

  test("debe renderizar con el tema azul sin romperse", () => {
    render(<Search onSearch={mockOnSearch} theme="blue" />);
    const input = screen.getByPlaceholderText("SEARCH...");
    expect(input).toBeTruthy();
  });
});