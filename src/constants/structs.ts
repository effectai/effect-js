import { Asset, NameType, Struct } from "@wharfkit/antelope";

@Struct.type("extended_symbol")
export class ExtendedSymbol extends Struct {
  static abiName = "extended_symbol";
  static abiFields = [
    { name: "contract", type: "name" },
    { name: "sym", type: "symbol" },
  ];
  constructor(sym: Asset.SymbolType, contract: NameType) {
    super({ sym, contract });
  }
}
