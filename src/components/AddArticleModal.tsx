import { Link, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ArticleModel } from "@/models/ArticleModel";

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArticle: (title: string, summary: string, imageUrl: string) => void;
  edit: ArticleModel;
}

export function AddArticleModal({ isOpen, onClose, onAddArticle, edit }: AddArticleModalProps) {
  const { control, handleSubmit, setValue, watch, reset } = useForm();
  const [imageInputType, setImageInputType] = useState<"upload" | "url">("upload");
  const preview = watch("imageUrl");

  useEffect(() => {
    console.log(edit);
    if (edit.title) {
      setValue("title", edit.title);
      setValue("summary", edit.summary);
      setValue("imageUrl", edit.image);
    }
  }, [edit]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("imageUrl", e.target.value);
  };

  const onSubmit = (data: any) => {
    if (data.title.trim()) {
      onAddArticle(
        data.title,
        data.summary,
        data.imageUrl ||
          `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80`,
      );

      reset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        className="bg-background rounded-xl shadow-xl w-full max-w-md modal-animation overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {preview && (
          <div className="relative h-40 w-full">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Add New Article</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1.5">
                Article Title
              </label>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <input
                    id="title"
                    type="text"
                    {...field}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background"
                    placeholder="Enter article title"
                  />
                )}
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium mb-1.5">
                Article Summary
              </label>
              <Controller
                control={control}
                name="summary"
                render={({ field }) => (
                  <input
                    id="summary"
                    type="text"
                    {...field}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background"
                    placeholder="Enter article summary"
                  />
                )}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1.5">
                Background Image
              </label>

              {/* Toggle between upload and URL */}
              <div className="flex mb-3">
                <button
                  onClick={() => setImageInputType("upload")}
                  className={`px-3 py-1.5 text-sm rounded-l-md border ${imageInputType === "upload" ? "bg-primary text-white border-primary" : "bg-background border-input"}`}
                >
                  <Upload className="h-4 w-4 inline mr-1.5" />
                  Upload
                </button>
                <button
                  onClick={() => setImageInputType("url")}
                  className={`px-3 py-1.5 text-sm rounded-r-md border ${imageInputType === "url" ? "bg-primary text-white border-primary" : "bg-background border-input"}`}
                >
                  <Link className="h-4 w-4 inline mr-1.5" />
                  URL
                </button>
              </div>

              {imageInputType === "upload" ? (
                <div className="flex items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer px-4 py-2.5 rounded-lg border border-input bg-background flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    <span>Choose File</span>
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
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background"
                        placeholder="Enter image URL"
                      />
                    )}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Example: https://example.com/image.jpg</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground btn-hover"
                disabled={!watch("title")?.trim()}
              >
                {edit.title ? "Atualizar Artigo" : "Adicionar artigo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
