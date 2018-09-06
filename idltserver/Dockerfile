FROM python:3.7.0
LABEL maintainer HaoFang
ENV PYTHONUNBUFFERED 1
RUN mkdir /idlt_api
WORKDIR /idlt_api
COPY . /idlt_api
RUN pip install -r requirements.txt