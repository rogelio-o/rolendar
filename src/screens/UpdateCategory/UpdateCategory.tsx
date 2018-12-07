import React from "react";
import { NavigationScreenProps } from "react-navigation";
import ICategory from "../../models/ICategory";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {
  saveCategory,
  findCategoryById,
} from "../../repositories/categoryRepository";
import { View } from "react-native";
import Loading from "../../components/Loading";

interface IState {
  loading: boolean;
  category?: ICategory;
}

export default class UpdateCategory extends React.Component<
  NavigationScreenProps,
  IState
> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public componentDidMount() {
    this.setState({ loading: true });
    findCategoryById(this.props.navigation.getParam("categoryId"))
      .then(category => this.setState({ category, loading: false }))
      .catch(() =>
        this.setState({ loading: false }, () => this.props.navigation.goBack())
      );
  }

  private async submit(category: ICategory): Promise<void> {
    await saveCategory(category);
  }

  public render() {
    const loading: boolean = this.state.loading;
    const category: ICategory | undefined = this.state.category;

    return (
      <View>
        <Loading visible={loading} />

        {this.state.category ? (
          <CategoryForm
            initialCategory={category}
            submit={c => this.submit(c)}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }
}
