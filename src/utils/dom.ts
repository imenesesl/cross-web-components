/* eslint-disable @typescript-eslint/no-unused-vars */
const minDom: Document | any = {
  addEventListener: (_x: string, _y: (a: any) => any): any => null,
  dispatchEvent: (_event: Event): any => null,
  createElement: (_tagName: string, _options?: ElementCreationOptions) => ({
    id: '',
  }),
  getElementsByTagName: (_tag: string): any => null,
  getElementById: (_tag: string): any => null,
  createDocumentFragment: () => ({
    appendChild: (_item: any) => ({}),
  }),
  body: {
    appendChild: (_item: any) => ({}),
  },
};

export function atWindow(): Window | any {
  return typeof window !== 'undefined' ? (window as Window) : {};
}

export function atDocument(): Document | any {
  return typeof document !== 'undefined' ? (document as Document) : minDom;
}
