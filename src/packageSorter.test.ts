import { sort } from "./packageSorter";

describe("Package Sorter", () => {
  describe("STANDARD packages", () => {
    test("should return STANDARD for small and light package", () => {
      expect(sort(10, 10, 10, 5)).toBe("STANDARD");
    });

    test("should return STANDARD for package just below bulky volume threshold", () => {
      expect(sort(99, 99, 99, 5)).toBe("STANDARD");
    });

    test("should return STANDARD for package just below bulky dimension threshold", () => {
      expect(sort(149, 10, 10, 5)).toBe("STANDARD");
    });

    test("should return STANDARD for package just below heavy threshold", () => {
      expect(sort(50, 50, 50, 19)).toBe("STANDARD");
    });

    test("should return STANDARD for package at edge of both thresholds but not exceeding", () => {
      expect(sort(149, 149, 40, 19)).toBe("STANDARD");
    });
  });

  describe("SPECIAL packages - Bulky only", () => {
    test("should return SPECIAL for package with volume at bulky threshold", () => {
      expect(sort(100, 100, 100, 10)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with volume exceeding bulky threshold", () => {
      expect(sort(150, 150, 150, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with width at bulky dimension threshold", () => {
      expect(sort(150, 10, 10, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with height at bulky dimension threshold", () => {
      expect(sort(10, 150, 10, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with length at bulky dimension threshold", () => {
      expect(sort(10, 10, 150, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with dimension exceeding bulky threshold", () => {
      expect(sort(200, 10, 10, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package with multiple large dimensions but not heavy", () => {
      expect(sort(150, 150, 10, 15)).toBe("SPECIAL");
    });
  });

  describe("SPECIAL packages - Heavy only", () => {
    test("should return SPECIAL for package at heavy threshold", () => {
      expect(sort(10, 10, 10, 20)).toBe("SPECIAL");
    });

    test("should return SPECIAL for package exceeding heavy threshold", () => {
      expect(sort(50, 50, 50, 25)).toBe("SPECIAL");
    });

    test("should return SPECIAL for very heavy but small package", () => {
      expect(sort(5, 5, 5, 50)).toBe("SPECIAL");
    });
  });

  describe("REJECTED packages - Both bulky and heavy", () => {
    test("should return REJECTED for package that is both bulky (volume) and heavy", () => {
      expect(sort(100, 100, 100, 20)).toBe("REJECTED");
    });

    test("should return REJECTED for package that is both bulky (dimension) and heavy", () => {
      expect(sort(150, 50, 50, 25)).toBe("REJECTED");
    });

    test("should return REJECTED for very large and very heavy package", () => {
      expect(sort(200, 200, 200, 100)).toBe("REJECTED");
    });

    test("should return REJECTED for package at both thresholds exactly", () => {
      expect(sort(150, 10, 10, 20)).toBe("REJECTED");
    });

    test("should return REJECTED for package with large volume and at heavy threshold", () => {
      expect(sort(100, 100, 100, 20)).toBe("REJECTED");
    });
  });

  describe("Edge cases", () => {
    test("should handle minimal dimensions and mass", () => {
      expect(sort(1, 1, 1, 1)).toBe("STANDARD");
    });

    test("should handle zero mass (standard package)", () => {
      expect(sort(10, 10, 10, 0)).toBe("STANDARD");
    });

    test("should handle decimal values for dimensions", () => {
      expect(sort(99.9, 99.9, 99.9, 19.9)).toBe("STANDARD");
    });

    test("should handle decimal values at threshold", () => {
      expect(sort(149.9, 10, 10, 19.9)).toBe("STANDARD");
    });

    test("should correctly classify with decimal at bulky threshold", () => {
      expect(sort(150.1, 10, 10, 10)).toBe("SPECIAL");
    });

    test("should correctly classify with decimal at heavy threshold", () => {
      expect(sort(10, 10, 10, 20.1)).toBe("SPECIAL");
    });
  });

  describe("Volume calculations", () => {
    test("should correctly calculate volume for exact threshold", () => {
      expect(sort(100, 100, 100, 10)).toBe("SPECIAL");
    });

    test("should correctly calculate volume just under threshold", () => {
      expect(sort(99, 100, 100, 10)).toBe("STANDARD");
    });

    test("should handle large volumes with small individual dimensions", () => {
      expect(sort(125, 125, 64, 10)).toBe("SPECIAL");
    });
  });
});
