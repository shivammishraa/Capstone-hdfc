import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (

        <div className="w-full bg-gray-100 p-4 shadow-md">
            <NavigationMenu className="mx-auto w-full max-w-7xl">
                <NavigationMenuList className="flex justify-between w-full">
                    {/* Home */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* 1. Policies */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Policies</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[600px] gap-3 p-4 md:w-[800px] bg-white md:grid-cols-2 lg:w-[900px]">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/policies/life"
                                                    className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 focus:bg-gray-100"
                                                >
                                                    <div className="text-sm font-medium leading-none">Life Insurance</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        Manage term, whole, and retirement life insurance policies.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/policies/health"
                                                    className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 focus:bg-gray-100"
                                                >
                                                    <div className="text-sm font-medium leading-none">Health Insurance</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        Coverage plans for individuals, families, and corporate groups.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/policies/motor"
                                                    className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 focus:bg-gray-100"
                                                >
                                                    <div className="text-sm font-medium leading-none">Motor Insurance</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        Manage car, bike, and commercial vehicle insurance policies.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/policies/home"
                                                    className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 focus:bg-gray-100"
                                                >
                                                    <div className="text-sm font-medium leading-none">Home Insurance</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        Protect properties against damage, theft, and accidents.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* 2. Claims */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Claims</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[600px] gap-3 p-4 md:w-[800px] bg-white md:grid-cols-2 lg:w-[900px]">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/claims/file" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">File a Claim</div>
                                                    <p className="text-sm text-gray-600">Submit a new insurance claim online.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/claims/track" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Track Claims</div>
                                                    <p className="text-sm text-gray-600">View status and history of submitted claims.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/claims/approvals" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Claim Approvals</div>
                                                    <p className="text-sm text-gray-600">Process and approve pending claims.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/claims/support" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Claim Support</div>
                                                    <p className="text-sm text-gray-600">Get assistance with claim documentation.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* 3. Customers */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Customers</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[600px] gap-3 p-4 md:w-[800px] bg-white md:grid-cols-2 lg:w-[900px]">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/customers/list" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Customer Directory</div>
                                                    <p className="text-sm text-gray-600">View and manage all customer profiles.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/customers/feedback" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Feedback</div>
                                                    <p className="text-sm text-gray-600">Track customer feedback and complaints.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/customers/support" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Customer Support</div>
                                                    <p className="text-sm text-gray-600">Provide assistance and resolve issues.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/customers/loyalty" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Loyalty Programs</div>
                                                    <p className="text-sm text-gray-600">Manage rewards and benefits for customers.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* 4. Reports */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[600px] gap-3 p-4 md:w-[800px] bg-white md:grid-cols-2 lg:w-[900px]">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/reports/sales" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Sales Reports</div>
                                                    <p className="text-sm text-gray-600">Track premium collections and renewals.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/reports/claims" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Claims Analytics</div>
                                                    <p className="text-sm text-gray-600">Analyze claim ratios and settlement times.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/reports/financial" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Financial Reports</div>
                                                    <p className="text-sm text-gray-600">View balance sheets, income, and expenses.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/reports/compliance" className="block p-3 rounded-md hover:bg-gray-100">
                                                    <div className="text-sm font-medium">Compliance</div>
                                                    <p className="text-sm text-gray-600">Generate regulatory and audit reports.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>


                    {/* Other simple menu items */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/docs"
                                className="px-4 py-2 text-sm font-medium hover:underline"
                            >
                                Docs
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
