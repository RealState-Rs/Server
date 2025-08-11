import { Prisma } from "@prisma/client";

type Operator = "gte" | "gt" | "lte" | "lt" | "equals" | "contains" | "in";

interface QueryParams {
    [key: string]:
    | string
    | number
    | undefined
    | { [op in Operator]?: string | number | string[] | number[] };
}

interface BuildPrismaQueryOptions<TWhereInput> {
    query: QueryParams;
    allowedFilters?: (keyof TWhereInput)[];
    page?: number;
    limit?: number;
}

export function buildPrismaQuery<TWhereInput>({
    query,
    allowedFilters = [],
    page = 1,
    limit = 10,
}: BuildPrismaQueryOptions<TWhereInput>) {
    const where: Partial<TWhereInput> = {};

    // Filters
    allowedFilters.forEach((key) => {
        const value = query[key as string];
        if (value !== undefined) {
            if (typeof value === "object" && value !== null) {
                (where as any)[key] = {};
                for (const op in value) {
                    if (
                        ["gte", "gt", "lte", "lt", "equals", "contains", "in"].includes(op)
                    ) {
                        (where as any)[key][op] = (value as any)[op];
                    }
                }
            } else {
                (where as any)[key] = value;
            }
        }
    });

    // Pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Sorting
    // Sorting
    let orderBy: Record<string, "asc" | "desc">[] = [{ createdAt: "desc" }];
    if (query.sort && typeof query.sort === "string") {
        const sortFields = query.sort.split(",").map((field) => {
            if (field.startsWith("-")) {
                return { [field.substring(1)]: "desc" as const };
            }
            return { [field]: "asc" as const };
        });
        orderBy = sortFields;
    }


    // Field selection
    let select: Record<string, boolean> | undefined;
    if (query.fields && typeof query.fields === "string") {
        select = {};
        query.fields.split(",").forEach((f) => {
            select![f] = true;
        });
    }

    return { where, skip, take, orderBy, select };
}
