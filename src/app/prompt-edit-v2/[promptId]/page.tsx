import NewPromptClient from "@/components/promptNew";

interface EditPromptPageProps {
    params: { promptId: string };
}

const EditPromptPage = ({ params }: EditPromptPageProps) => {
    const { promptId } = params;
    return <NewPromptClient isEdit={true} promptId={promptId} />;
};

export default EditPromptPage;
