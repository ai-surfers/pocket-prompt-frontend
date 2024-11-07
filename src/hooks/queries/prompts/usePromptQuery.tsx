import { getPrompt } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import { useQuery } from "@tanstack/react-query";

const usePromptQuery = (id: string) => {
    const { data, isLoading } = useQuery<PromptDetails>({
        queryKey: [id],
        queryFn: () => getPrompt(id).then((res) => res),
        enabled: !!id,
    });

    return { data, isLoading };
};

export default usePromptQuery;
