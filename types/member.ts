// types/member.ts
export interface Member {
    id: string;
    first_name: string;
    last_name: string;
    state: string;
    image: {
      url: string;
    };
    birthday: string;
    profession: string;
    address: string;
    city: string;
    email: string;
    bindings: Binding[];
}

export interface Binding {
    organization: string;
    role: string;
    description: string | null;
}


export interface Organization {
    id: string;
    title: string;
    description: string;
}
  
export interface Role {
    id: string;
    title: string;
    description: string;
}