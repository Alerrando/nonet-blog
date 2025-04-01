import { FormEvent } from "react";
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

interface DialogImageProps {
  handleSave: (e: FormEvent<HTMLFormElement>) => void;
}

export function DialogImage({ handleSave }: DialogImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`p-2 rounded hover:bg-zinc-700 text-white`} title="Inserir imagem">
          <FaImage />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action="" onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Adicionar Imagem</DialogTitle>
            <DialogDescription>
              Adicione uma imagem para o seu artigo. Clique em Salvar quando terminar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Campo de URL */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="url">Url da Imagem</Label>
              <Input id="url" type="url" accept="image/*" name="url" className="w-full" required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
