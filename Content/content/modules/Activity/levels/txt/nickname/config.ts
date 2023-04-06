// export
export const NUMBER_STYLES = {
  superscript: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'],
  subscript: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
  caps: ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'],
  serif: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'],
  'round-full': ['⓿', '➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒'],
  'round-empty': ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'],
  landing: ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'],
  lite: ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'],
};

interface NumberStyles {
  [key: string]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}
