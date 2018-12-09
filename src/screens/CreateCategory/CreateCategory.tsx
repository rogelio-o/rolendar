import React from "react";
import { NavigationScreenProps } from "react-navigation";
import CategoryForm from "../../components/CategoryForm";
import { saveCategory } from "../../repositories/categoryRepository";
import ICategory from "../../models/ICategory";

export default class CreateCategory extends React.Component<
  NavigationScreenProps
> {
  private async submit(category: ICategory): Promise<void> {
    await saveCategory(category);
  }

  public render() {
    return (
      <CategoryForm
        submit={category => this.submit(category)}
        navigation={this.props.navigation}
      />
    );
  }
}
