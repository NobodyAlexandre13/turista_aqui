import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBack: {
    flex: 1, 
    padding: 20,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: '600',
    marginTop: -22
  },
  loadingImage: {
    marginBottom: 24,
  },
  areaLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    width: '90%'
  },
  areaSelect: {
    bottom: 140,
    justifyContent: 'flex-end',
    flex: 1
  }
});