import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormDataImage, formSchemaImage } from "./Validation";

interface DialogImageProps {
  editor: Editor;
}

export function DialogImage({ editor }: DialogImageProps) {
  const { register, handleSubmit, setValue, control } = useForm<FormDataImage>({
    resolver: zodResolver(formSchemaImage),
  });
  const [imageInputType, setImageInputType] = useState<"upload" | "url">("upload");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.value);
    setValue("image", e.target.value);
  };

  function submit(e: FormDataImage) {
    editor.commands.setImage({ src: (e.image as string) || "", alt: e.imageAlt });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded hover:bg-zinc-700 text-white" title="Inserir imagem">
          <FaImage />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action="" onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle className="dark:text-white">Adicionar Imagem</DialogTitle>
            <DialogDescription>
              Adicione uma imagem para o seu artigo. Clique em Salvar quando terminar.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            {/* Toggle entre upload e URL */}
            <div className="flex mb-3">
              <button
                type="button"
                onClick={() => setImageInputType("upload")}
                className={`px-3 py-1.5 text-sm rounded-l-md border ${
                  imageInputType === "upload"
                    ? "bg-primary text-white border-primary dark:bg-blue-600 dark:border-blue-600"
                    : "bg-background border-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                }`}
              >
                <FaImage className="h-4 w-4 inline mr-1.5" />
                Upload
              </button>
              <button
                type="button"
                onClick={() => setImageInputType("url")}
                className={`px-3 py-1.5 text-sm rounded-r-md border ${
                  imageInputType === "url"
                    ? "bg-primary text-white border-primary dark:bg-blue-600 dark:border-blue-600"
                    : "bg-background border-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                }`}
              >
                URL
              </button>
            </div>

            {/* Campo de imagem - upload ou URL */}
            {imageInputType === "upload" ? (
              <div className="flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer px-4 py-2.5 rounded-lg border border-input bg-background flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  <FaImage className="h-4 w-4 mr-2" />
                  <span>Escolher Arquivo</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {preview && (
                  <div className="ml-2 h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                    <img src={preview} alt="Thumbnail" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Controller
                  control={control}
                  name="imageUrl"
                  render={({ field }) => (
                    <input
                      type="url"
                      {...field}
                      onChange={(e) => handleUrlChange(e)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="Enter image URL"
                    />
                  )}
                />
                <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
                  Example: https://example.com/image.jpg
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="dark:text-white">
                Fechar
              </Button>
            </DialogClose>

            <Button type="submit" className="dark:text-white">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
