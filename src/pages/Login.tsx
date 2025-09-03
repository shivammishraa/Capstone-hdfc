// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../schemas/loginSchema";
// import type { LoginSchemaType } from "../schemas/loginSchema";
// import { useNavigate } from "react-router-dom";
// import {Input} from "@/components/ui/input";
// import { loginUser } from "../services/authService";
// import { toast } from "react-toastify";
// import { hashPassword } from "../utils/hashPassword";
// import logo from "/HDFC_Life_Logo.svg";
// import { motion } from "framer-motion";
// import { useState } from "react";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginSchemaType>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginSchemaType) => {
//     setLoading(true);
//     try {
//       const hashedPassword = await hashPassword(data.password);
//       const token = await loginUser(data.name, hashedPassword);
//       localStorage.setItem("token", token);
//       toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (err: any) {
//       toast.error(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const button = e.currentTarget;
//     const ripple = document.createElement("span");
//     const size = button.offsetWidth;
//     const rect = button.getBoundingClientRect();
//     ripple.style.width = ripple.style.height = `${size}px`;
//     ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//     ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
//     ripple.className =
//       "absolute rounded-full bg-white/40 animate-ripple pointer-events-none";
//     button.appendChild(ripple);
//     setTimeout(() => ripple.remove(), 600);
//   };



//   return (
//     <motion.div
//       className="flex flex-col min-h-screen bg-gradient-to-r from-[#1e1e2f] via-[#4b3b6e] to-[#6eceda] overflow-y-scroll no-scrollbar h-64"
//       initial={{ backgroundPosition: "0% 50%" }}
//       animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
//       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       style={{
//         background: `linear-gradient(135deg, #1e1e2f, #4b3b6e, #6eceda, #d4f1f9)`,
//         backgroundSize: "400% 400%",
//       }}
//     >
//       <div className="flex flex-col min-h-screen sticky top-0 z-50">
//         <header className="flex justify-center py-6 bg-transparent ">
//           <motion.img
//             src={logo}
//             alt="HDFC LIFE"
//             className="h-20 w-auto"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           />
//         </header>

//         <main className="relative flex flex-1 items-center justify-center px-4">
//           <div className="absolute inset-0 flex items-center justify-center z-0">
//             <img
//               src={logo}
//               alt="HDFC LIFE Background"
//               className="w-3/7 opacity-300 blur-[10px] contrast-125"
//             />
//           </div>

//           <motion.form
//             onSubmit={handleSubmit(onSubmit)}
//             noValidate
//             className="relative z-10 w-full max-w-xl p-12 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-l shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-6 text-center text-white py-2 rounded tracking-wide">
//               Welcome to HDFC Life
//             </h2>

//             <motion.div
//               className="mb-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <label className="block mb-1 font-medium text-white">Username</label>
//               <Input
//                 type="name"
//                 placeholder="Enter your Username"
//                 {...register("name")}
//                 className="w-full px-4 py-2 border border-white/30 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
//               />
//               {errors.name && (
//                 <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
//               )}
//             </motion.div>

//             <motion.div
//               className="mb-6"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <label className="block mb-1 font-medium text-white">Password</label>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password")}
//                 className="w-full px-4 py-2 border border-white/30 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
//               />
//               {errors.password && (
//                 <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
//               )}
//             </motion.div>

//             <motion.button
//               type="submit"
//               disabled={loading}
//               onClick={handleRipple}
//               className="relative overflow-hidden w-full bg-gradient-to-r from-[#6eceda] to-[#4b3b6e] text-white py-2 rounded hover:brightness-110 transition-all duration-300 shadow-md hover:shadow-lg"
//               whileTap={{ scale: 0.98 }}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </motion.button>
//           </motion.form>
//         </main>
//       </div>

//       <footer className="bg-white shadow py-4 mt-auto">
//         <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} HDFC Life. All rights reserved.</p>
//           <div className="flex space-x-4 mt-2 md:mt-0">
//             <span className="cursor-pointer hover:text-gray-700">Privacy Policy</span>
//             <span className="cursor-pointer hover:text-gray-700">Terms of Service</span>
//             <span className="cursor-pointer hover:text-gray-700">Contact Us</span>
//           </div>
//         </div>
//       </footer>
//     </motion.div>
//   );
// };

// export default Login;





// // import * as React from "react"
// // import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
// // import { cva } from "class-variance-authority"
// // import { ChevronDown } from "lucide-react"

// // import { cn } from "@/lib/utils"

// // const NavigationMenu = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.Root>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
// // >(({ className, children, ...props }, ref) => (
// //   <NavigationMenuPrimitive.Root
// //     ref={ref}
// //     className={cn(
// //       "relative z-10 flex max-w-max flex-1 items-center justify-center",
// //       className
// //     )}
// //     {...props}
// //   >
// //     {children}
// //     <NavigationMenuViewport />
// //   </NavigationMenuPrimitive.Root>
// // ))
// // NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

// // const NavigationMenuList = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.List>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
// // >(({ className, ...props }, ref) => (
// //   <NavigationMenuPrimitive.List
// //     ref={ref}
// //     className={cn(
// //       "group flex flex-1 list-none items-center justify-center space-x-1",
// //       className
// //     )}
// //     {...props}
// //   />
// // ))
// // NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

// // const NavigationMenuItem = NavigationMenuPrimitive.Item

// // const navigationMenuTriggerStyle = cva(
// //   "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
// // )

// // const NavigationMenuTrigger = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
// // >(({ className, children, ...props }, ref) => (
// //   <NavigationMenuPrimitive.Trigger
// //     ref={ref}
// //     className={cn(navigationMenuTriggerStyle(), "group", className)}
// //     {...props}
// //   >
// //     {children}{" "}
// //     <ChevronDown
// //       className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
// //       aria-hidden="true"
// //     />
// //   </NavigationMenuPrimitive.Trigger>
// // ))
// // NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

// // // const NavigationMenuContent = React.forwardRef<
// // //   React.ElementRef<typeof NavigationMenuPrimitive.Content>,
// // //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
// // // >(({ className, ...props }, ref) => (
// // //   <NavigationMenuPrimitive.Content
// // //     ref={ref}
// // //     className={cn(
// // //       "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
// // //       className
// // //     )}
// // //     {...props}
// // //   />
// // // ))
// // const NavigationMenuContent = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.Content>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
// // >(({ className, ...props }, ref) => (
// //   <NavigationMenuPrimitive.Content
// //     ref={ref}
// //     className={cn(
// //       "left-0 top-0 w-full md:absolute md:w-[3/4] bg-white text-black", // keep only layout + styling
// //       className
// //     )}
// //     {...props}
// //   />
// // ))

// // NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

// // const NavigationMenuLink = NavigationMenuPrimitive.Link

// // const NavigationMenuViewport = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
// // >(({ className, ...props }, ref) => (
// //   <div className={cn("absolute left-0 top-full flex justify-center")}>
// //     <NavigationMenuPrimitive.Viewport
// //       className={cn(
// //         "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
// //         className
// //       )}
// //       ref={ref}
// //       {...props}
// //     />
// //   </div>
// // ))
// // NavigationMenuViewport.displayName =
// //   NavigationMenuPrimitive.Viewport.displayName

// // const NavigationMenuIndicator = React.forwardRef<
// //   React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
// //   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
// // >(({ className, ...props }, ref) => (
// //   <NavigationMenuPrimitive.Indicator
// //     ref={ref}
// //     className={cn(
// //       "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
// //       className
// //     )}
// //     {...props}
// //   >
// //     <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
// //   </NavigationMenuPrimitive.Indicator>
// // ))
// // NavigationMenuIndicator.displayName =
// //   NavigationMenuPrimitive.Indicator.displayName

// // export {
// //   navigationMenuTriggerStyle,
// //   NavigationMenu,
// //   NavigationMenuList,
// //   NavigationMenuItem,
// //   NavigationMenuContent,
// //   NavigationMenuTrigger,
// //   NavigationMenuLink,
// //   NavigationMenuIndicator,
// //   NavigationMenuViewport,
// // }


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import type { LoginSchemaType } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import {Input} from "@/components/ui/input";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { hashPassword } from "../utils/hashPassword";
import logo from "/HDFC_Life_Logo.svg";
import { motion } from "framer-motion";
import { useState } from "react";
 
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
 
  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    try {
      const hashedPassword = await hashPassword(data.password);
      const token = await loginUser(data.name, hashedPassword);
      localStorage.setItem("token", token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
 
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const size = button.offsetWidth;
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className =
      "absolute rounded-full bg-white/40 animate-ripple pointer-events-none";
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
 
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-r from-[#1e1e2f] via-[#4b3b6e] to-[#6eceda] overflow-y-scroll no-scrollbar h-64"
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: `linear-gradient(135deg, #1e1e2f, #4b3b6e, #6eceda, #d4f1f9)`,
        backgroundSize: "400% 400%",
      }}
    >
      <div className="flex flex-col min-h-screen sticky top-0 z-50">
        <header className="flex justify-center py-6 bg-transparent ">
          <motion.img
            src={logo}
            alt="HDFC LIFE"
            className="h-20 w-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
        </header>
 
        <main className="relative flex flex-1 items-center justify-center px-4">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <img
              src={logo}
              alt="HDFC LIFE Background"
              className="w-3/7 opacity-300 blur-[10px] contrast-125"
            />
          </div>
 
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative z-10 w-full max-w-xl p-12 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-l shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-white py-2 rounded tracking-wide">
              Welcome to HDFC Life
            </h2>
 
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-1 font-medium text-white">Username</label>
              <Input
                type="string"
                placeholder="Enter your username"
                {...register("name")}
                className="w-full px-4 py-2 border border-white/30 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </motion.div>
 
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-1 font-medium text-white">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-2 border border-white/30 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </motion.div>
 
            <motion.button
              type="submit"
              disabled={loading}
              onClick={handleRipple}
              className="relative overflow-hidden w-full bg-gradient-to-r from-[#6eceda] to-[#4b3b6e] text-white py-2 rounded hover:brightness-110 transition-all duration-300 shadow-md hover:shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </motion.form>
        </main>
      </div>
 
      <footer className="bg-white shadow py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HDFC Life. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <span className="cursor-pointer hover:text-gray-700">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-700">Terms of Service</span>
            <span className="cursor-pointer hover:text-gray-700">Contact Us</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
 
export default Login;