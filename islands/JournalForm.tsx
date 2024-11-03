import { useEffect, useState } from "preact/hooks";
import { fetchJournalEntryById, saveJournalEntry } from "../actions/journal.ts";
import { JournalEntryProps } from "../types/journal.tsx";
import { PageProps } from "$fresh/server.ts";

interface JournalEntriesListProps {
    id: string;
}

const JournalEntryForm = ({ url, params }: PageProps) => {
    const id = params?.id || "0";
    const requestUrl = new URL(url);
    const journalId = requestUrl.searchParams.get("journalId");

    const [entry, setEntry] = useState<JournalEntryProps>({
        id: id || "0",
        title: "",
        content: "",
        created_at: "",
        tags: [],
        journal_id: journalId || "0",
        photoUrls: [],
    });
    const [newTag, setNewTag] = useState(""); // Input for adding new tags
    const [error, setError] = useState("");
    const [files, setFiles] = useState<File[]>([]); // State to store multiple files

    useEffect(() => {
        if (id == "0") return;
        fetchJournalEntryById(id).then((fetchedEntry) => {
            setEntry(fetchedEntry); // Initialize form with fetched data
        }).catch((err) => {
            setError(err.message);
        });
    }, [id]);

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = target;

        setEntry((prevEntry) => ({
            ...prevEntry,
            [name]: value, // Dynamically update the field based on the input's name attribute
        }));
    };

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            setFiles(Array.from(target.files)); // Store selected files in state
        }
    };

    const handleTagAdd = () => {
        const trimmedTag = newTag.trim().toLowerCase();
        if (trimmedTag && !entry.tags.includes(trimmedTag)) {
            setEntry((prevEntry) => ({
                ...prevEntry,
                tags: [...prevEntry.tags, trimmedTag],
            }));
            setNewTag(""); // Clear input after adding
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setEntry((prevEntry) => ({
            ...prevEntry,
            tags: prevEntry.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter
            handleTagAdd();
        }
    };

    const handleSave = async () => {

        //TODO: handle multiple files in one save

        let newS3Url = "";

        if (files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);
            const fileName = file.name;
            console.log("File name:", fileName);

            newS3Url = await fetch("/api/photoUploads", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => response.data)
                .catch((err: any) => console.log(err));
        }

        console.log("newS3Url", newS3Url);

        if (newS3Url) {
            if (entry.id == "0") {
                entry.photoUrls = [newS3Url];
            } else {
                entry.photoUrls = entry.photoUrls ? [...entry.photoUrls, newS3Url] : [newS3Url];
            }
        }

        saveJournalEntry(entry)
        .then(async () => {
            await new Promise(r => setTimeout(r, 100));
            window.location.href = `/journal/${entry.journal_id}`;
        }).catch((err) => {
            setError(err.message);
        });
    };

    console.log("entry", entry);

    return (
        <div class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                {entry.id != '0' ? `Edit: ${entry.title}` : `New: ${entry.title}`}
            </h2>

            {/* Editable Tags */}
            <div class="flex flex-wrap gap-2 mb-4">
                {entry.tags.map((tag) => (
                    <span
                        key={tag}
                        class="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                        #{tag}
                        <button
                            onClick={() => handleTagRemove(tag)}
                            class="ml-2 text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) =>
                        setNewTag((e.target as HTMLInputElement).value)}
                    placeholder="Add tag"
                    class="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                    onKeyDown={handleKeyDown} // Add tag on Enter
                />
                <button
                    type="button"
                    onClick={handleTagAdd}
                    class="ml-2 px-3 py-1 rounded-full bg-blue-500 text-white font-medium text-sm hover:bg-blue-600"
                >
                    Add Tag
                </button>
            </div>

            {/* Form */}
            <form method="post" class="space-y-6">
                {/* Title Input */}
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={entry.title}
                        onInput={handleInputChange}
                        class="input input-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
                        placeholder="Enter entry title..."
                    />
                </div>

                {/* Content Textarea */}
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        Content
                    </label>
                    <textarea
                        name="content"
                        placeholder="Write your entry here..."
                        class="textarea textarea-bordered w-full h-96 px-4 py-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500 resize-y"
                        value={entry.content}
                        onInput={handleInputChange}
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        Upload Files
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Save Button */}
                <div class="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={handleSave}
                        class="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div class="mt-4 text-center text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
};

export default JournalEntryForm;
