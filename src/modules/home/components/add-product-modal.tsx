import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { createProduct } from "../../../lib/api/products";
import { Alert, AlertDescription } from "../../../components/alert";
import {
  createProductSchema,
  type CreateProductFormData,
} from "../../../lib/validations/product";
import { FormItem } from "../../../components/form-item";
import { useCompanies } from "../hooks/useCompanies";
import { useUsers } from "../hooks/useUsers";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// todo: loading for data
// todo:
export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      packaging: "pet",
      deposit: 0,
      volume: 0,
      companyId: 0,
      registeredById: 0,
    },
  });

  // Fetch companies and users for dropdowns
  const { data: companiesData, isLoading: isLoadingCompanies } = useCompanies();

  const { data: usersData, isLoading: isLoadingUsers } = useUsers();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch all queries that might be affected
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["active-products-count"] });
      queryClient.invalidateQueries({ queryKey: ["pending-products-count"] });

      // Reset form and close modal
      reset();
      onOpenChange(false);
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      reset();
      mutation.reset();
    }
  }, [open, reset, mutation]);

  const onSubmit = (data: CreateProductFormData) => {
    console.log("DATA", data);
    // mutation.mutate(data);
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

        <form id="create-product" onSubmit={handleSubmit(onSubmit)}>
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
            <FormItem>
              <Label htmlFor="name">
                Product name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g. Coca Cola 0.5L"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </FormItem>

            {/* Packaging */}

            <Controller
              control={control}
              name="packaging"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="packaging">
                    Packaging <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      className="w-[180px]"
                      id="packaging"
                      aria-invalid={Boolean(fieldState.error?.message)}
                    >
                      <SelectValue placeholder="Select packaging type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pet">PET</SelectItem>
                      <SelectItem value="can">Can</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="tetra">Glass</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Deposit and Volume in a row */}
            <div className="grid gap-2">
              <Label htmlFor="deposit">
                Deposit (cents) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deposit"
                type="number"
                min="1"
                {...register("deposit", { valueAsNumber: true })}
                placeholder="e.g. 100"
                aria-invalid={!!errors.deposit}
              />
              {errors.deposit && (
                <p className="text-destructive text-sm">
                  {errors.deposit.message}
                </p>
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
                {...register("volume", { valueAsNumber: true })}
                placeholder="e.g. 500"
                aria-invalid={!!errors.volume}
              />
              {errors.volume && (
                <p className="text-destructive text-sm">
                  {errors.volume.message}
                </p>
              )}
            </div>

            {/* Company */}
            <Controller
              control={control}
              name="companyId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="companyId">
                    Packaging <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger
                      id="companyId"
                      className="w-[180px]"
                      aria-invalid={Boolean(fieldState.error?.message)}
                    >
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem
                          key={company.id}
                          value={company.id.toString()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Registered By */}
            <Controller
              control={control}
              name="registeredById"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="registeredBy">
                    Packaging <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    {...field}
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger
                      id="company"
                      className="w-[180px]"
                      aria-invalid={Boolean(fieldState.error?.message)}
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
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || mutation.isPending}>
              {isSubmitting || mutation.isPending
                ? "Creating..."
                : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
