import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

import { Button } from "../../components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { AddProductModal } from "./components/add-product-modal";

export function QuickActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl pb-0">Quick actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 pt-6">
            <Button asChild variant="outline">
              <NavLink to="/products">
                <Eye />
                View all products
              </NavLink>
            </Button>
            <Button type="button" onClick={() => setIsModalOpen(true)}>
              <Plus />
              Add new product
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
