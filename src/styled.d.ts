import "styled-components";

declare module "styled-components" {
  export interface Theme {
    bgColor: string;
    boxColor: string;
    textColor: string;
    accentColor: string;
  }
}
