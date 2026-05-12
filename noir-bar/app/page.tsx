import { redirect } from "next/navigation";

export default function Home() {
  // Redirige al menú del local demo
  // Cuando tengas tu propio local, cambiá "noir-bar" por tu slug
  redirect("/noir-bar");
}
