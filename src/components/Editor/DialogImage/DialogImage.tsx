import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormDataImage, formSchemaImage } from "./Validation";

interface DialogImageProps {
  editor: Editor;
}

export function DialogImage({ editor }: DialogImageProps) {
  const { register, handleSubmit } = useForm<FormDataImage>({
    resolver: zodResolver(formSchemaImage),
    defaultValues: {
      imageUpload: null,
      imageUrl: "",
    },
  });
  const [imageInputType, setImageInputType] = useState<"upload" | "url">("upload");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.value);
  };

  function submit(e: FormDataImage) {
    if (e.imageUpload) {
      const file = e.imageUpload[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        editor.commands.setImage({ src: reader.result as string, alt: e.imageAlt });
      };
      reader.readAsDataURL(file);
    } else {
      editor.commands.setImage({ src: e.imageUrl, alt: e.imageAlt });
    }
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
            <DialogTitle>Adicionar Imagem</DialogTitle>
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
                  htmlFor="imageUpload"
                  className="cursor-pointer px-4 py-2.5 rounded-lg border border-input bg-background flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  onChange={handleImageChange}
                >
                  <FaImage className="h-4 w-4 mr-2" />
                  <span>Escolher Arquivo</span>
                  <input
                    {...register("imageUpload")}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
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
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  {...register("imageUrl")}
                  id="imageUrl"
                  type="url"
                  className="w-full"
                  onChange={handleUrlChange}
                  required
                />
                {preview && (
                  <div className="mt-2 w-full h-40">
                    <img src={preview} alt="Imagem Previa" className="w-full h-full object-cover rounded-md" />
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
