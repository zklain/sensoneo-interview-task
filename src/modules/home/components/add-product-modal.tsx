import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import {
  createProduct,
  type CreateProductData,
} from "../../../lib/api/products";
import { fetchCompanies } from "../../../lib/api/companies";
import { fetchUsers } from "../../../lib/api/users";
import { Alert, AlertDescription } from "../../../components/alert";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// todo: zod validation
// todo: useForm
// todo: form fields
// todo: submitting state
// todo: error state
export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    packaging: "pet",
    deposit: 0,
    volume: 0,
    companyId: 0,
    registeredById: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateProductData, string>>
  >({});

  // Fetch companies and users for dropdowns
  const { data: companiesData } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch all queries that might be affected
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["active-products-count"] });
      queryClient.invalidateQueries({ queryKey: ["pending-products-count"] });

      // Reset form and close modal
      setFormData({
        name: "",
        packaging: "pet",
        deposit: 0,
        volume: 0,
        companyId: 0,
        registeredById: 0,
      });
      setErrors({});
      onOpenChange(false);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (formData.deposit <= 0) {
      newErrors.deposit = "Deposit must be greater than 0";
    }

    if (formData.volume <= 0) {
      newErrors.volume = "Volume must be greater than 0";
    }

    if (!formData.companyId || formData.companyId === 0) {
      newErrors.companyId = "Please select a company";
    }

    if (!formData.registeredById || formData.registeredById === 0) {
      newErrors.registeredById = "Please select a user";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    mutation.mutate(formData);
  };

  const handleInputChange = (
    field: keyof CreateProductData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const companies = companiesData?.data || [];
  const users = usersData?.data || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>
            Create a new product in the deposit management system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {mutation.isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Failed to create product"}
                </AlertDescription>
              </Alert>
            )}

            {/* Product Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Product name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Coca Cola 0.5L"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            {/* Packaging */}
            <div className="grid gap-2">
              <Label htmlFor="packaging">
                Packaging <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.packaging}
                onValueChange={(value) => handleInputChange("packaging", value)}
              >
                <SelectTrigger id="packaging">
                  <SelectValue placeholder="Select packaging type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">PET</SelectItem>
                  <SelectItem value="can">Can</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deposit and Volume in a row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deposit">
                  Deposit (cents) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="deposit"
                  type="number"
                  min="1"
                  value={formData.deposit || ""}
                  onChange={(e) =>
                    handleInputChange("deposit", Number(e.target.value))
                  }
                  placeholder="e.g. 100"
                  aria-invalid={!!errors.deposit}
                />
                {errors.deposit && (
                  <p className="text-destructive text-sm">{errors.deposit}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="volume">
                  Volume (ml) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="volume"
                  type="number"
                  min="1"
                  value={formData.volume || ""}
                  onChange={(e) =>
                    handleInputChange("volume", Number(e.target.value))
                  }
                  placeholder="e.g. 500"
                  aria-invalid={!!errors.volume}
                />
                {errors.volume && (
                  <p className="text-destructive text-sm">{errors.volume}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="grid gap-2">
              <Label htmlFor="company">
                Company <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.companyId.toString()}
                onValueChange={(value) =>
                  handleInputChange("companyId", Number(value))
                }
              >
                <SelectTrigger id="company" aria-invalid={!!errors.companyId}>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.companyId && (
                <p className="text-destructive text-sm">{errors.companyId}</p>
              )}
            </div>

            {/* Registered By */}
            <div className="grid gap-2">
              <Label htmlFor="registeredBy">
                Registered by <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.registeredById.toString()}
                onValueChange={(value) =>
                  handleInputChange("registeredById", Number(value))
                }
              >
                <SelectTrigger
                  id="registeredBy"
                  aria-invalid={!!errors.registeredById}
                >
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.registeredById && (
                <p className="text-destructive text-sm">
                  {errors.registeredById}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
