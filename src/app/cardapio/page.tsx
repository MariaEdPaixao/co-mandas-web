import { getPratos } from "@/actions/dish-actions";
import BasePage from "@/components/base-page";
import CrudDropDown from "@/components/crud-dropdown";
import DishRegisters from "@/components/dish-register";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react";

export default async function Cardapio() {
    const data = await getPratos();

    return (
        <BasePage>
            <h1 className="text-3xl font-semibold">Cardápio</h1>
            <p className="text-[#828282] text-lg">Aqui você pode ver todos os itens do cardápio de seu restaurante</p>
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-white shadow-lg mt-3">
                <div className="flex justify-center items-center">
                    <div className="border border-gray-300 h-9 w-[60%] p-0.5 rounded-lg flex">
                        <input
                            className="w-full border-none text-lg pl-4 focus:outline-none text-[#798593]"
                            type="text"
                            placeholder="Busque por um prato"
                        />
                        <Search size={22} color="#798593" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <section className="grid grid-cols-[0.5fr_repeat(2,1fr)_repeat(2,0.5fr)] text-center items-center gap-2 mb-4 text-sm p-2 px-4 bg-[#EF3C42] text-white font-bold rounded-lg">
                        <span>Nome do prato</span>
                        <span>Descrição</span>
                        <span>Categoria</span>
                        <span>Valor do prato</span>
                        <span></span>
                    </section>

                    <div className="flex flex-col max-h-[320px] overflow-y-auto pb-2 custom-scrollbar md:max-h-[280px] xl:max-h-[450px] 2xl:max-h-[550px]">
                        {data.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500">Nenhum prato encontrado</p>
                            </div>
                        ) : (
                            data.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[0.5fr_repeat(2,1fr)_repeat(2,0.5fr)] items-center text-center gap-2 border-b border-[#F58488] p-3 md:p-2"
                                >
                                    <p className="font-semibold text-2sm">{item.name}</p>
                                    <p className="font-semibold text-2sm">{item.description}</p>
                                    <p className="font-semibold text-2sm">{item.category}</p>
                                    <p className="font-semibold text-2sm">R$ {item.price}</p>
                                    <div className="justify-self-end pr-2 font-semibold text-2sm">
                                        <CrudDropDown />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="shadow-lg font-semibold ml-5 bg-[#EF3C42] cursor-pointer">
                                    <Plus color="white" />
                                    adicionar prato
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogDescription className="hidden">
                                    Preencha os campos para adicionar um novo prato.
                                </DialogDescription>
                                <DialogTitle className="hidden">Adicionar prato</DialogTitle>
                                <DishRegisters />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </BasePage>
    );
}
