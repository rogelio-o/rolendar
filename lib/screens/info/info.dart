import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class InfoScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(''),
        elevation: 0.0
      ),
      backgroundColor: Theme.of(context).primaryColor,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          _buildTitle(context),
          _buildBottomText(context),
          _buildSocial(context),
        ],
      ),
    );
  }

  Widget _buildTitle(BuildContext context) {
    final TextStyle textStyle = Theme.of(context).primaryTextTheme.title;
    return Container(
      padding: EdgeInsets.only(bottom: 40),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Made with ',
                style: textStyle
              ),
              Icon(MdiIcons.heart, color: Theme.of(context).primaryColorLight),
              Text(
                ' by',
                style: textStyle
              )
            ]
          ),
          GestureDetector(
            child: Text(
              'Rogelio Orts',
              style: textStyle.copyWith(fontSize: 30, fontWeight: FontWeight.bold)
            ),
            onTap: () => _launchURL("http://rogelioorts.com")
          )
        ]
      )
    );
  }

  Widget _buildSocial(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(bottom: 40),
      child: Column(
        children: <Widget>[
          _buildSocialItem(context, MdiIcons.web, "rogelioorts.com", "http://rogelioorts.com", _launchURL),
          _buildSocialItem(context, MdiIcons.email, "yo@rogelioorts.com", "mailto:yo@rogelioorts.com?subject=Hi%20Roger!", _launchEmail),
          _buildSocialItem(context, MdiIcons.githubCircle, "rogelio-o", "https://github.com/rogelio-o", _launchURL),
          _buildSocialItem(context, MdiIcons.twitter, "@RogelioOrts", "https://twitter.com/RogelioOrts", _launchURL)
        ],
      )
    );
  }

  Widget _buildSocialItem(BuildContext context, IconData icon, String text, String url, Function open) {
    final TextStyle textStyle = Theme.of(context).primaryTextTheme.subhead;
    return GestureDetector(
      child: Container(
        padding: EdgeInsets.only(bottom: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.only(right: 10),
              child: Icon(icon, color: textStyle.color),
            ),
            Text(text, style: textStyle)
          ]
        ),
      ),
      onTap: () => open(url)
    );
  }

  _launchURL(String url) async {
    if(await canLaunch(url)) {
      await launch(url, forceWebView: true);
    }
  }

  _launchEmail(String email) async {
    if(await canLaunch(email)) {
      await launch(email, forceSafariVC: false, forceWebView: false);
    }
  }

  Widget _buildBottomText(BuildContext context) {
    final TextStyle textStyle = Theme.of(context).primaryTextTheme.subtitle;
    return Container(
      padding: EdgeInsets.only(left: 20, right: 20, bottom: 40),
      child: GestureDetector(
        child: Text(
          'This application is a tool I use in my day to day. I used to do it before with a spreadsheet, '
          + 'but I decided to develop an application for two reasons: scheduling is easier and quicker with the app and '
          + 'I wanted to research about the new mobile frameworks. The final version of the app is developed with Flutter, '
          + 'but a previous version was developed with React Native. If you are interested in the code, just click on this text, '
          + 'both versions are shared on Github.',
          textAlign: TextAlign.center,
          style: textStyle,
        ),
        onTap: () => _launchURL("https://github.com/rogelio-o/rolendar"),
      )
    );
  }

}
