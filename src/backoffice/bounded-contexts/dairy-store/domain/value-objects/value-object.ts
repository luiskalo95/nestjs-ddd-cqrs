interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<Props extends ValueObjectProps>{
    
    public readonly props: Props;

    constructor(props: Props) {
        this.props = Object.freeze(props);
    }
}