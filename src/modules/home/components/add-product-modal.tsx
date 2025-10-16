import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { Alert, AlertDescription } from "../../../components/alert";
import { Button } from "../../../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog";
import { FormItem } from "../../../components/form-item";
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
import {
  createProductSchema,
  type CreateProductFormData,
} from "../../../lib/validations/product";
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
  // Fetch companies and users for dropdowns
  const { data: companiesData, isLoading: isLoadingCompanies } = useCompanies();

  const { data: usersData, isLoading: isLoadingUsers } = useUsers();

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      packaging: "pet",
      deposit: 0,
      volume: 0,
      companyId: "",
      registeredById: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch all queries that might be affected
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["active-products"] });
      queryClient.invalidateQueries({ queryKey: ["pending-products"] });

      // Reset form and close modal
      reset();
      onOpenChange(false);
    },
  });

  const onSubmit = (data: CreateProductFormData) => {
    console.log("DATA", data);
    mutation.mutate({
      ...data,
      companyId: parseInt(data.companyId),
      registeredById: parseInt(data.registeredById),
    });
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
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="name">
                    Product name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    id="name"
                    placeholder="e.g. Coca Cola 0.5L"
                    aria-invalid={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

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

            <Controller
              control={control}
              name="deposit"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="deposit">
                    Deposit (cents) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="deposit"
                    type="number"
                    min="1"
                    placeholder="e.g. 50"
                    onBlur={field.onBlur}
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    aria-invalid={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="volume"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label htmlFor="volume">
                    Volume (ml) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    min="1"
                    onBlur={field.onBlur}
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    placeholder="e.g. 500ml"
                    aria-invalid={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <p className="text-destructive text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

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
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      id="companyId"
                      className="w-[250px]"
                      aria-invalid={Boolean(fieldState.error)}
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
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      id="company"
                      className="w-[250px]"
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
