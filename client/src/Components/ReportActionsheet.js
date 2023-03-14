import React from "react";
import { Actionsheet, Center } from "native-base";

const ReportActionsheet = (props) => {
  const { isOpen, onClose, handleReport, post } = props;

  const data = [
    { reportSubject: "Spam", key: 1 },
    { reportSubject: "Nudity or sexual activity", key: 2 },
    { reportSubject: "Hate speech or symbols", key: 3 },
    { reportSubject: "Violence or dangerous organisations", key: 4 },
    { reportSubject: "Bullying or harassment", key: 5 },
    { reportSubject: "Scams or fraud", key: 6 },
  ];

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {data.map((report, index) => {
            return (
              <Actionsheet.Item
                onPress={() => handleReport(report.reportSubject, post)}
                key={index}
              >
                {report.reportSubject}
              </Actionsheet.Item>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default ReportActionsheet;
