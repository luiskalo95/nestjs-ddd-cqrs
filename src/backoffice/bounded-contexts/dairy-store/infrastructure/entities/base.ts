import { Column } from "typeorm";

export abstract class BaseEntity {

    @Column({ type: 'datetime', nullable: false })
    public createdAt: Date;

    @Column({ type: 'datetime', nullable: true })
    public updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    public deletedAt: Date;

}