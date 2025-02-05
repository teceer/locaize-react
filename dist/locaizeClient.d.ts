type LocaizeClient = {
    clientSide: () => (strings: TemplateStringsArray, ...values: any[]) => string | undefined;
    serverSide: () => (strings: TemplateStringsArray, language: string, ...values: any[]) => Promise<string>;
};
export declare const createLocaizeClient: (options: {
    apiKey: string;
}) => LocaizeClient;
export {};
