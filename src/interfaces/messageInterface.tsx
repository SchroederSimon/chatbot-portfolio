export interface Message {
    id: string;
    type: "bot" | "user";
    text: React.ReactNode;
}

